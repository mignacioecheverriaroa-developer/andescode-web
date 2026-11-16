// Crea una copia navegable de dist/ con rutas relativas (para una vista previa privada que no
// vive en la raíz de un dominio). Uso: node tools/preview/relativize.mjs dist preview
import { cp, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { join, relative, dirname, posix } from 'node:path';

const [src = 'dist', out = 'preview'] = process.argv.slice(2);
await rm(out, { recursive: true, force: true });
await cp(src, out, { recursive: true });

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const toRelative = (fromFile, url) => {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const [path, hash = ''] = url.split('#');
  let target = path.endsWith('/') ? `${path}index.html` : path;
  if (target === '') return url;
  const rel = posix.relative(posix.dirname('/' + fromFile.split('\\').join('/')), target) || 'index.html';
  return rel + (hash ? `#${hash}` : '');
};

let count = 0;
for await (const file of walk(out)) {
  if (!file.endsWith('.html')) continue;
  const rel = relative(out, file);
  let html = await readFile(file, 'utf8');
  // La vista previa se sirve dentro de otro sitio: se quita la CSP propia y las URL absolutas.
  html = html.replace(/<meta[^>]+http-equiv="?Content-Security-Policy"?[^>]*>/i, '');
  html = html.replace(/<meta[^>]+content="default-src[^>]*>/i, '');
  html = html.replace(/\b(href|src)=("?)(\/[^"\s>]*)\2/g, (m, attr, q, url) => `${attr}=${q}${toRelative(rel, url)}${q}`);
  html = html.replace(/\bsrcset="([^"]+)"/g, (m, list) =>
    `srcset="${list
      .split(',')
      .map((part) => {
        const [u, d] = part.trim().split(/\s+/);
        return [toRelative(rel, u), d].filter(Boolean).join(' ');
      })
      .join(', ')}"`,
  );
  await writeFile(file, html);
  count++;
}
console.log(`${count} páginas con rutas relativas en ${out}/ (${dirname(out) === '.' ? '' : ''})`);
