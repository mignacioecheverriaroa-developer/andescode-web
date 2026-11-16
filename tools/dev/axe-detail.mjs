/* global window */
// Detalle de fallas de contraste con axe-core. Uso: node tools/dev/axe-detail.mjs <url> [ancho]
import puppeteer from 'puppeteer';
import { readFile } from 'node:fs/promises';
const [url, width = '1280'] = process.argv.slice(2);
const axe = await readFile(process.env.AXE || 'node_modules/axe-core/axe.min.js', 'utf8');
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setBypassCSP(true);
await p.setViewport({ width: Number(width), height: 900 });
await p.goto(url, { waitUntil: process.env.WAIT || 'networkidle0' });
await p.addScriptTag({ content: axe });
const res = await p.evaluate(async () => ((r) => [...r.violations, ...r.incomplete])(await window.axe.run(document, { runOnly: ['color-contrast'] })));
for (const v of res) for (const n of v.nodes.slice(0, 6)) console.log(n.target.join(' '), '|', n.any[0]?.message);
await b.close();
