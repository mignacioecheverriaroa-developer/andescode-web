/* global window, document */
// Captura la portada servida localmente (scroll completo para cargar imágenes diferidas) y
// registra errores de consola. Uso: node tools/dev/shot-home.mjs <url> <out.png> [ancho] [alto]
import puppeteer from 'puppeteer';
const [url, out, width = '1440', height = '900'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errors = [];
p.on('console', (m) => ['error', 'warning'].includes(m.type()) && errors.push(`${m.type()}: ${m.text()}`));
p.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
await p.setViewport({ width: Number(width), height: Number(height), deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: 'networkidle0' });
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 150));
  }
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 2800));
await p.screenshot({ path: out, fullPage: process.env.FULL !== '0' });
console.log(errors.length ? errors.join('\n') : 'console: sin errores');
await b.close();
