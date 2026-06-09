#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const outDir = path.join(process.cwd(), 'client', 'public', 'fonts');
const cssUrl = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap';

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function fetchArrayBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.arrayBuffer();
}

async function main(){
  await fs.mkdir(outDir, { recursive: true });
  console.log('Fetching Google Fonts CSS...');
  const css = await fetchText(cssUrl);
  // extract font file urls (any format)
  const urls = [];
  const re = /url\((https:[^)]+)\)/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    urls.push(m[1]);
  }
  const localCss = css.replace(/url\((https:[^)]+)\)/g, (m, p1) => {
    const name = path.basename(new URL(p1).pathname);
    return `url('/fonts/${name}')`;
  }).replace(/font-display: swap;/g, 'font-display: swap;');

  for (const url of urls) {
    const name = path.basename(new URL(url).pathname);
    const dest = path.join(outDir, name);
    if (!(await exists(dest))) {
      console.log('Downloading', name);
      try{
        const buf = Buffer.from(await fetchArrayBuffer(url));
        await fs.writeFile(dest, buf);
      }catch(e){
        console.warn('Failed to download', url, e.message);
      }
    } else {
      console.log('Already exists', name);
    }
  }

  await fs.writeFile(path.join(outDir, 'fonts.css'), localCss, 'utf8');
  console.log('Fonts written to', outDir);
}

async function exists(p){
  try{ await fs.access(p); return true;}catch{return false}
}

main().catch(err=>{console.error(err); process.exit(1)});
