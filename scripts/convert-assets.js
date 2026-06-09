#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
try{
  const sharp = (await import('sharp')).default;
  const dir = path.join(process.cwd(),'client','public','manus-storage');
  async function main(){
    const files = await fs.readdir(dir);
    for(const f of files){
      if(!f.endsWith('.png')) continue;
      const inPath = path.join(dir,f);
      const name = f.replace(/\.png$/,'');
      const webp = path.join(dir, `${name}.webp`);
      const avif = path.join(dir, `${name}.avif`);
      try{
        const img = sharp(inPath);
        await img.webp({quality:80}).toFile(webp);
        await img.avif({quality:60}).toFile(avif);
        console.log('Converted', f, '->', name + '.webp', name + '.avif');
      }catch(e){
        console.warn('Failed to convert', f, e.message);
      }
    }
  }
  main().catch(e=>{console.error(e);process.exit(1)});
}catch(e){
  console.error('Sharp not available or failed to import:', e.message);
  process.exit(0);
}
