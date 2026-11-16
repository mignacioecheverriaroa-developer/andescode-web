/* global window, document */
// Captura en tema claro (fija localStorage antes de cargar). Uso: node tools/dev/shot-light.mjs <url> <selector> <out>
import puppeteer from 'puppeteer';
const [url, sel, out] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.evaluateOnNewDocument(() => localStorage.setItem('theme', 'light'));
await p.goto(url, { waitUntil: 'networkidle0' });
await p.evaluate(
  (s) =>
    window.scrollTo({
      top: document.querySelector(s).getBoundingClientRect().top + window.scrollY - 120,
      behavior: 'instant',
    }),
  sel,
);
await new Promise((r) => setTimeout(r, 2000));
await p.screenshot({ path: out });
await b.close();
