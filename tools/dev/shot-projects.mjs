import puppeteer from 'puppeteer';
import { serve } from '/home/claude/andescode-web/scripts/serve.mjs';
const base = '/home/claude/mignacioecheverriaroa-netizen/';
const sites = ['netvoltsoluciones', 'vicons-construccion', 'solucionesdesarrolloteconologico'];
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
let port = 4400;
for (const s of sites) {
  const srv = await serve(base + s, ++port);
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await p.setRequestInterception(true);
  p.on('request', (r) => {
    const u = r.url();
    if (u.startsWith('http://localhost')) r.continue();
    else r.abort();
  });
  await p
    .goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0', timeout: 30000 })
    .catch((e) => console.log('goto', e.message));
  await new Promise((r) => setTimeout(r, 1500));
  await p.screenshot({ path: `/tmp/proj-${s}.png` });
  await p.screenshot({ path: `/tmp/proj-${s}-full.png`, fullPage: true });
  srv.close();
  await p.close();
}
await b.close();
