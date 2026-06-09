import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import pngToIco from 'png-to-ico';

const root = process.cwd();
const svgPath = path.join(root, 'client', 'public', 'manus-static', 'nawins_education_logo_v2.svg');
const outDir = path.join(root, 'client', 'public', 'manus-storage');

if (!fs.existsSync(svgPath)) {
  console.error('Source SVG not found:', svgPath);
  process.exit(1);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function renderSVGToPNG(size, outPath) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const html = `<!doctype html><html><body style="margin:0;padding:0;display:flex;align-items:center;justify-content:center;background:transparent;height:100vh;">${svg}</body></html>`;
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const el = await page.$('svg');
    if (!el) throw new Error('SVG element not found in content');
    await el.screenshot({ path: outPath, omitBackground: true });
  } finally {
    await browser.close();
  }
}

async function generate() {
  try {
    const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
    const pngPaths = [];
    for (const s of sizes) {
      const out = path.join(outDir, `nawins_logo_${s}.png`);
      await renderSVGToPNG(s, out);
      console.log('Wrote', out);
      pngPaths.push(out);
    }

    // create favicon.ico using 16,32,48
    const icoInput = [
      path.join(outDir, 'nawins_logo_16.png'),
      path.join(outDir, 'nawins_logo_32.png'),
      path.join(outDir, 'nawins_logo_48.png'),
    ];
    const icoBuf = await pngToIco(icoInput);
    fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuf);
    console.log('Wrote favicon.ico');

    // write a simple PNG fallback for browsers
    fs.copyFileSync(path.join(outDir, 'nawins_logo_512.png'), path.join(root, 'client', 'public', 'nawins_logo_512.png'));
    console.log('Copied large PNG fallback');

    console.log('Puppeteer asset generation complete.');
  } catch (err) {
    console.error('Error generating assets:', err);
    process.exit(1);
  }
}

generate();
