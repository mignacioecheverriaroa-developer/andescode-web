/* global window, document */
// Captura la vista en un selector. Uso: node tools/dev/shot-at.mjs <url> <selector> <out.png> [ancho] [alto]
import puppeteer from 'puppeteer';
const [url, sel, out, width = '1440', height = '900'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errors = [];
p.on('console', (m) => ['error', 'warning'].includes(m.type()) && errors.push(m.text()));
p.on('pageerror', (e) => errors.push(e.message));
await p.setViewport({
  width: Number(width),
  height: Number(height),
  isMobile: Number(width) < 600,
  hasTouch: Number(width) < 600,
});
await p.goto(url, { waitUntil: 'networkidle0' });
await p.evaluate(
  (s) =>
    window.scrollTo({
      top: document.querySelector(s).getBoundingClientRect().top + window.scrollY - 120,
      behavior: 'instant',
    }),
  sel,
);
await new Promise((r) => setTimeout(r, 2500));
await p.screenshot({ path: out });
console.log(errors.length ? errors.join('\n') : 'console: sin errores');
await b.close();
