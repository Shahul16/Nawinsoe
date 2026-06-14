import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = process.cwd();
const svgPath = path.join(root, 'client', 'public', 'Nawins-static', 'nawins_education_logo_v2.svg');
const outDir = path.join(root, 'client', 'public', 'nawins-storage');

if (!fs.existsSync(svgPath)) {
  console.error('Source SVG not found:', svgPath);
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function generate() {
  try {
    const svg = fs.readFileSync(svgPath);

    // Generate PNG sizes
    const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
    for (const size of sizes) {
      const out = path.join(outDir, `nawins_logo_${size}.png`);
      await sharp(svg)
        .resize(size, size, { fit: 'contain' })
        .png({ quality: 90 })
        .toFile(out);
      console.log('Wrote', out);
    }

    // Generate favicon.ico (contains 16,32,48)
    const icoOut = path.join(outDir, 'favicon.ico');
    const icoBufs = [];
    for (const s of [16, 32, 48]) {
      const buf = await sharp(svg).resize(s, s, { fit: 'contain' }).png().toBuffer();
      icoBufs.push(buf);
    }
    // sharp can write .ico by passing .toFile with .ico extension on recent versions
    await sharp({ create: { width: 32, height: 32, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .png()
      .toFile(path.join(outDir, 'tmp_32.png'));

    // Use sharp to combine via metadata: instead, use png-to-ico package would be ideal.
    // As a fallback, write the 32px PNG as favicon.ico for compatibility in browsers.
    fs.writeFileSync(icoOut, icoBufs[1]);
    console.log('Wrote', icoOut);

    // Generate webp and avif for large sizes
    const webpOut = path.join(outDir, 'nawins_logo_512.webp');
    await sharp(svg).resize(512, 512, { fit: 'contain' }).webp({ quality: 90 }).toFile(webpOut);
    console.log('Wrote', webpOut);

    const avifOut = path.join(outDir, 'nawins_logo_512.avif');
    await sharp(svg).resize(512, 512, { fit: 'contain' }).avif({ quality: 50 }).toFile(avifOut);
    console.log('Wrote', avifOut);

    console.log('Asset generation complete.');
  } catch (err) {
    console.error('Error generating assets:', err);
    process.exit(1);
  }
}

generate();
