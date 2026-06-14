#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
try {
  const ttf2woff2 = require('ttf2woff2');
  const fontsDir = path.join(__dirname, '..', 'client', 'public', 'fonts');
  if (!fs.existsSync(fontsDir)) {
    console.error('Fonts directory not found:', fontsDir);
    process.exit(1);
  }
  const files = fs.readdirSync(fontsDir).filter(f => f.toLowerCase().endsWith('.ttf'));
  if (files.length === 0) {
    console.log('No TTF files found to convert.');
    process.exit(0);
  }
  for (const file of files) {
    const inPath = path.join(fontsDir, file);
    const name = path.basename(file, '.ttf');
    const outPath = path.join(fontsDir, `${name}.woff2`);
    const buf = fs.readFileSync(inPath);
    const woff2 = ttf2woff2(buf);
    fs.writeFileSync(outPath, Buffer.from(woff2));
    console.log('Wrote', outPath);
  }
  console.log('All conversions complete.');
} catch (err) {
  console.error('Error converting TTF to WOFF2:', err.message || err);
  process.exit(1);
}
