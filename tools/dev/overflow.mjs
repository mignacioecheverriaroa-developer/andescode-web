/* global document, window */
// Herramienta de desarrollo: lista elementos que desbordan horizontalmente a 360 px.
import puppeteer from 'puppeteer';
import { serve } from '../../scripts/serve.mjs';

const s = await serve('dist', 4330);
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 360, height: 800 });
for (const path of process.argv.slice(2)) {
  await p.goto('http://localhost:4330' + path, { waitUntil: 'networkidle0' });
  const r = await p.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    culprits: [...document.querySelectorAll('body *')]
      .filter((e) => !e.closest('.hero') && e.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 8)
      .map((e) => `${e.tagName}.${e.getAttribute('class')} ${Math.round(e.getBoundingClientRect().right)}`),
  }));
  console.log(path, JSON.stringify(r));
}
await b.close();
s.close();
