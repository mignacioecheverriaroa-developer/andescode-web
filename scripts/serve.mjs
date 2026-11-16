// Servidor estático mínimo para pruebas locales de /dist (imita GitHub Pages: index.html y 404.html).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

export function serve(root = 'dist', port = 8080) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    let file = join(root, path);
    try {
      const s = await stat(file);
      if (s.isDirectory()) {
        if (!path.endsWith('/')) {
          res.writeHead(301, { Location: `${path}/` });
          return res.end();
        }
        file = join(file, 'index.html');
      }
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      const notFound = path.startsWith('/en/') ? join(root, 'en/404.html') : join(root, '404.html');
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(await readFile(notFound).catch(() => 'Not found'));
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT || 8080);
  await serve('dist', port);
  console.log(`Sirviendo dist/ en http://localhost:${port}`);
}
