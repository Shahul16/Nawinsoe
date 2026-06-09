import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WATCH_DIRS = ['client/src', 'server', 'shared', 'scripts', 'docs', 'reports'];

// Only parse source-like text files
const EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.md', '.json']);

// Load tsconfig paths for @/* and @shared/*
const tsconfigPath = path.join(ROOT, 'tsconfig.json');
let tsconfig = {};
try {
  tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
} catch {
  tsconfig = {};
}

const tsPaths = tsconfig?.compilerOptions?.paths ?? {};

function resolveTsPath(spec) {
  for (const [key, arr] of Object.entries(tsPaths)) {
    if (!key.endsWith('/*')) continue;
    const prefix = key.slice(0, -2); // remove /*
    if (!spec.startsWith(prefix + '/')) continue;
    const rest = spec.slice(prefix.length + 1);
    for (const target of arr) {
      if (typeof target !== 'string') continue;
      const targetBase = target.slice(0, -2); // remove /*
      return path.resolve(ROOT, targetBase, rest);
    }
  }
  return null;
}

// Load vite aliases from vite.config.ts (very lightweight extraction)
function resolveViteAlias(spec) {
  // patterns: "@": path.resolve(..."client","src") etc.
  if (!spec.startsWith('@')) return null;

  const viteConfigText = readSafe(path.join(ROOT, 'vite.config.ts'));
  if (!viteConfigText) return null;

  // Hardcode known aliases to avoid brittle parsing
  if (spec.startsWith('@shared/')) {
    return path.resolve(ROOT, 'shared', spec.slice('@shared/'.length));
  }
  if (spec.startsWith('@/')) {
    return path.resolve(ROOT, 'client/src', spec.slice('@/'.length));
  }

  if (spec.startsWith('@assets/')) {
    // alias exists but not used in source scanning often
    // attach_assets may not exist; keep consistent with vite.config.ts
    return path.resolve(ROOT, 'attached_assets', spec.slice('@assets/'.length));
  }

  return null;
}


const isTextFile = (p) => {
  const ext = path.extname(p).toLowerCase();
  return EXT.has(ext);
};

function walk(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    if (!fs.existsSync(cur)) continue;
    const stat = fs.statSync(cur);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(cur)) {
        stack.push(path.join(cur, entry));
      }
    } else if (stat.isFile()) {
      out.push(cur);
    }
  }
  return out;
}

function readSafe(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return '';
  }
}

// Very lightweight AST-ish tracing: extract relative import specifiers and
// resolve to candidate files.
function extractRelativeImports(sourceText) {
  const results = [];

  // import x from './a'
  // import './a'
  // export * from './a'
  // require('./a')
  // dynamic import('./a')
  const re = /(?:import\s*(?:[^'"()]*?from\s*)?|export\s*\*\s*from\s*|require\s*\(|import\s*\()\s*['"](\.[^'"`]+)['"]/g;
  let m;
  while ((m = re.exec(sourceText)) !== null) {
    results.push(m[1]);
  }

  return results;
}

function resolveImport(fromFile, spec) {
  // Handle path aliases first
  const tsResolved = resolveTsPath(spec);
  if (tsResolved) {
    return resolveWithExtensions(tsResolved);
  }

  const viteResolved = resolveViteAlias(spec);
  if (viteResolved) {
    return resolveWithExtensions(viteResolved);
  }

  // Handle relative specifiers
  const basedir = path.dirname(fromFile);
  const abs = path.resolve(basedir, spec);

  return resolveWithExtensions(abs);
}

function resolveWithExtensions(abs) {
  // Candidate resolution order
  const candidates = [];

  // If abs already points to a file
  candidates.push(abs);

  // Try common extensions
  for (const ext of ['.ts', '.tsx', '.js', '.jsx', '.json']) {
    candidates.push(abs + ext);
  }

  // Try index files in directory
  candidates.push(path.join(abs, 'index.ts'));
  candidates.push(path.join(abs, 'index.tsx'));
  candidates.push(path.join(abs, 'index.js'));
  candidates.push(path.join(abs, 'index.jsx'));
  candidates.push(path.join(abs, 'index.json'));

  const existing = candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
  return existing ?? null;
}


function rel(p) {
  return path.relative(ROOT, p).replaceAll('\\', '/');
}

// Build file set
const fileList = [];
for (const d of WATCH_DIRS) {
  const abs = path.join(ROOT, d);
  if (!fs.existsSync(abs)) continue;
  const files = walk(abs).filter((p) => isTextFile(p));
  fileList.push(...files);
}

const fileSet = new Set(fileList);

// Count references between files
const importCounts = new Map(); // targetFile -> number of importing files/specifiers
const importerByTarget = new Map(); // targetFile -> Set(importerFiles)

for (const file of fileList) {
  const text = readSafe(file);
  const imports = extractRelativeImports(text);
  for (const spec of imports) {
    const resolved = resolveImport(file, spec);
    if (!resolved) continue;
    if (!fileSet.has(resolved)) continue; // Only count within our scan universe

    const prev = importCounts.get(resolved) ?? 0;
    importCounts.set(resolved, prev + 1);

    let set = importerByTarget.get(resolved);
    if (!set) importerByTarget.set(resolved, (set = new Set()));
    set.add(file);
  }
}

// Root entry points to compute “reachable” modules
// (approx: include common entry files and routes/pages usage)
const entryHints = [
  'client/src/main.tsx',
  'client/src/App.tsx',
  'client/src/index.css',
  'server/_core/index.ts',
  'server/routes/app.router.ts',
  'shared/const.ts',
];

const entryFiles = entryHints
  .map((p) => path.join(ROOT, p))
  .filter((p) => fs.existsSync(p) && fs.statSync(p).isFile());

// Build adjacency for reachability (file -> resolved relative imports)
const adjacency = new Map();
for (const file of fileList) {
  const text = readSafe(file);
  const imports = extractRelativeImports(text);
  const outs = [];
  for (const spec of imports) {
    const resolved = resolveImport(file, spec);
    if (resolved && fileSet.has(resolved)) outs.push(resolved);
  }
  adjacency.set(file, outs);
}

const reachable = new Set();
const queue = [...entryFiles];
for (const f of queue) reachable.add(f);
while (queue.length) {
  const cur = queue.pop();
  const outs = adjacency.get(cur) ?? [];
  for (const nxt of outs) {
    if (!reachable.has(nxt)) {
      reachable.add(nxt);
      queue.push(nxt);
    }
  }
}

// Candidate unused: files with 0 incoming imports AND not reachable from entry points.
const candidates = [];
for (const f of fileList) {
  if (reachable.has(f)) continue;
  const count = importCounts.get(f) ?? 0;
  if (count === 0) {
    candidates.push(f);
  }
}

// Deduplicate by directory-level candidates for convenience
const top = candidates
  .sort((a, b) => (a.length - b.length))
  .slice(0, 200);

const output = {
  scanRoot: ROOT,
  scannedDirs: WATCH_DIRS,
  fileCount: fileList.length,
  entryFiles: entryFiles.map(rel),
  reachableCount: reachable.size,
  unusedZeroIncomingCandidatesCount: candidates.length,
  sampleUnusedCandidates: top.map((f) => ({ file: rel(f), referenceCount: 0 })),
};

fs.writeFileSync(path.join(ROOT, 'reports/REFERENCE_TRACE_REPORT.json'), JSON.stringify(output, null, 2));

// Print summary
console.log(JSON.stringify({
  fileCount: fileList.length,
  reachableCount: reachable.size,
  unusedZeroIncomingCandidatesCount: candidates.length,
  report: 'reports/REFERENCE_TRACE_REPORT.json',
}, null, 2));

