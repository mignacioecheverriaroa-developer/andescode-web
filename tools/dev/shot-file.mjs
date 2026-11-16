import puppeteer from 'puppeteer';
const [file, out, width = '1400'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: Number(width), height: 900 });
await p.goto('file://' + file);
await p.screenshot({ path: out, fullPage: true });
await b.close();
