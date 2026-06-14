#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

const dir = path.join(process.cwd(),'client','public','nawins-storage');

async function toFile(file, dataUrl){
  const parts = dataUrl.split(',');
  if(parts.length!==2) throw new Error('Invalid data url');
  const buf = Buffer.from(parts[1], 'base64');
  await fs.writeFile(file, buf);
}

async function main(){
  const files = await fs.readdir(dir);
  const pngs = files.filter(f=>f.endsWith('.png'));
  if(pngs.length===0){ console.log('No PNGs found in', dir); return }
  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setContent('<!doctype html><html><body></body></html>');

  for(const f of pngs){
    const inPath = path.join(dir,f);
    const name = f.replace(/\.png$/,'');
    const webpPath = path.join(dir,`${name}.webp`);
    const avifPath = path.join(dir,`${name}.avif`);
    const buf = await fs.readFile(inPath);
    const fileUrl = 'data:image/png;base64,' + buf.toString('base64');
    try{
      const result = await page.evaluate(async (src)=>{
        const img = new Image();
        img.src = src;
        await img.decode();
        const c = document.createElement('canvas');
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const ctx = c.getContext('2d');
        ctx.drawImage(img,0,0);
        const webp = c.toDataURL('image/webp', 0.8);
        let avif = null;
        try{ avif = c.toDataURL('image/avif', 0.6); }catch(e){ avif = null }
        return {webp, avif};
      }, fileUrl);
      if(result.webp) { await toFile(webpPath, result.webp); console.log('Wrote', webpPath) }
      if(result.avif) { await toFile(avifPath, result.avif); console.log('Wrote', avifPath) }
    }catch(err){
      console.warn('Failed converting', f, err.message);
    }
  }
  await browser.close();
}

main().catch(err=>{ console.error(err); process.exit(1) });
