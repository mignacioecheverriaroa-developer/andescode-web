import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { bundle as bundleCss } from 'lightningcss';
import * as esbuild from 'esbuild';
import { minify as minifyHtml } from 'html-minifier-terser';
import Image from '@11ty/eleventy-img';

const OUT = 'dist';
const isProd = process.env.NODE_ENV === 'production';
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);

// Script en línea que aplica el tema guardado antes de pintar (evita parpadeo).
// Su hash SHA-256 se agrega a la Content-Security-Policy.
export const THEME_SCRIPT =
  "(function(){var d=document.documentElement;d.className=d.className.replace('no-js','js');try{var t=localStorage.getItem('theme');if(t==='light'){d.setAttribute('data-theme',t)}}catch(e){}})();";
const THEME_SCRIPT_HASH = `'sha256-${createHash('sha256').update(THEME_SCRIPT).digest('base64')}'`;

const assets = {};

async function buildCss() {
  const { code } = bundleCss({
    filename: 'src/styles/main.css',
    minify: true,
    sourceMap: false,
    targets: { chrome: 123 << 16, firefox: 120 << 16, safari: (17 << 16) | (5 << 8) },
  });
  const name = `main.${hash(code)}.css`;
  await mkdir(`${OUT}/assets/css`, { recursive: true });
  await writeFile(`${OUT}/assets/css/${name}`, code);
  assets['main.css'] = `/assets/css/${name}`;
}

async function buildJs() {
  const result = await esbuild.build({
    entryPoints: ['src/scripts/main.js'],
    bundle: true,
    format: 'esm',
    minify: true,
    target: ['es2020'],
    write: false,
  });
  const code = result.outputFiles[0].contents;
  const name = `main.${hash(code)}.js`;
  await mkdir(`${OUT}/assets/js`, { recursive: true });
  await writeFile(`${OUT}/assets/js/${name}`, code);
  assets['main.js'] = `/assets/js/${name}`;
}

export default function (eleventyConfig) {
  const pathPrefix = process.env.PATH_PREFIX || '/';

  eleventyConfig.on('eleventy.before', async () => {
    await Promise.all([buildCss(), buildJs()]);
  });

  eleventyConfig.addWatchTarget('src/styles/');
  eleventyConfig.addWatchTarget('src/scripts/');

  eleventyConfig.addPassthroughCopy({
    'src/assets/fonts': 'assets/fonts',
    'src/assets/brand': 'assets/brand',
    'src/assets/icons': 'assets/icons',
    'src/assets/img/og': 'assets/img/og',
    'src/favicon.svg': 'favicon.svg',
    'src/favicon.ico': 'favicon.ico',
  });

  eleventyConfig.addGlobalData('csp', {
    themeHash: THEME_SCRIPT_HASH,
  });
  eleventyConfig.addGlobalData('themeScript', THEME_SCRIPT);

  // Ruta de un recurso con hash (CSS/JS), respetando el prefijo de despliegue.
  eleventyConfig.addShortcode('asset', (name) => {
    if (!assets[name]) throw new Error(`Recurso desconocido: ${name}`);
    return path.posix.join(pathPrefix, assets[name]);
  });

  // URL absoluta (para canonical, Open Graph, sitemap y JSON-LD).
  // `url` ya incluye el prefijo de ruta (filtro url), así que solo se antepone el origen.
  eleventyConfig.addFilter('absolute', (url, base) => new URL(url, new URL(base).origin).href);

  eleventyConfig.addFilter('serviceUrl', (s, lang) =>
    lang === 'es' ? `/servicios/${s.es.slug}/` : `/en/services/${s.en.slug}/`,
  );
  eleventyConfig.addFilter('json', (value) => JSON.stringify(value));
  eleventyConfig.addFilter('isoDate', (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter('find', (arr, key, value) => arr.find((x) => x[key] === value));

  // Imagen responsiva: <picture> con AVIF/WebP/JPEG, srcset, sizes, dimensiones y lazy loading.
  eleventyConfig.addShortcode(
    'picture',
    async (src, alt, sizes, cls = '', eager = false, widths = [480, 800, 1200, 1600]) => {
      const metadata = await Image(src, {
        widths,
        formats: ['avif', 'webp', 'jpeg'],
        outputDir: `${OUT}/assets/img/`,
        urlPath: path.posix.join(pathPrefix, '/assets/img/'),
        sharpJpegOptions: { quality: 78, progressive: true, mozjpeg: true },
        sharpWebpOptions: { quality: 72 },
        sharpAvifOptions: { quality: 52 },
      });
      return Image.generateHTML(metadata, {
        alt,
        sizes,
        class: cls,
        loading: eager ? 'eager' : 'lazy',
        decoding: 'async',
        ...(eager ? { fetchpriority: 'high' } : {}),
      });
    },
  );

  // Ícono SVG del logo en línea (texto con currentColor + variables CSS para el isotipo).
  eleventyConfig.addAsyncShortcode('inlineSvg', async (file, label = '') => {
    let svg = await readFile(file, 'utf8');
    svg = svg
      .replace(/<title[^>]*>.*?<\/title>/, '')
      .replace(/\s(aria-labelledby|role)="[^"]*"/g, '')
      .replace(
        '<svg',
        label ? `<svg role="img" aria-label="${label}"` : '<svg aria-hidden="true" focusable="false"',
      );
    return svg.trim();
  });

  if (isProd) {
    eleventyConfig.addTransform('htmlmin', async function (content) {
      if ((this.page.outputPath || '').endsWith('.html')) {
        return minifyHtml(content, {
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeComments: true,
          minifyJS: false,
          minifyCSS: false,
          keepClosingSlash: false,
          sortAttributes: true,
        });
      }
      return content;
    });
  }

  return {
    dir: { input: 'src', output: OUT, includes: 'partials', layouts: 'layouts', data: '_data' },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    pathPrefix,
  };
}
