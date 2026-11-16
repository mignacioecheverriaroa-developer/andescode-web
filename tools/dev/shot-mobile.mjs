/* global window, document */
// Capturas móviles (390x844): hero, servicios, galería, barra de acciones y menú abierto.
import puppeteer from 'puppeteer';
const [url, prefix] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2600));
await p.screenshot({ path: `${prefix}-hero.png` });
for (const sel of ['#servicios .service-cards', '#galeria', '#proceso']) {
  await p.evaluate(
    (s) =>
      window.scrollTo({
        top: document.querySelector(s).getBoundingClientRect().top + window.scrollY - 160,
        behavior: 'instant',
      }),
    sel,
  );
  await new Promise((r) => setTimeout(r, 1500));
  await p.screenshot({ path: `${prefix}-${sel.replace(/[^a-z]/g, '')}.png` });
}
await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await p.click('.nav-toggle');
await new Promise((r) => setTimeout(r, 600));
await p.screenshot({ path: `${prefix}-menu.png` });
const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log('overflow-x:', overflow, errors.length ? errors.join('\n') : 'console: sin errores');
await b.close();
