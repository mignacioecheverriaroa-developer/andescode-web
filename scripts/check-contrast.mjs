// Verifica el contraste WCAG de las combinaciones de la paleta.
// Uso: node scripts/check-contrast.mjs  (sale con código 1 si algo no cumple AA)
import { palette } from './palette.mjs';

const hex = (h) =>
  h
    .replace('#', '')
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// [primer plano, fondo, mínimo exigido, uso]
const pairs = (p) => [
  [p.ink, p.bg, 7, 'texto principal sobre fondo'],
  [p.ink, p.surface, 7, 'texto principal sobre superficie'],
  [p.muted, p.bg, 4.5, 'texto secundario sobre fondo'],
  [p.muted, p.surface, 4.5, 'texto secundario sobre superficie'],
  [p.link, p.bg, 4.5, 'enlaces sobre fondo'],
  [p.link, p.surface, 4.5, 'enlaces sobre superficie'],
  [p.onPrimary, p.primary, 4.5, 'texto de botón primario'],
  [p.onAccent, p.accent, 4.5, 'texto sobre acento'],
  [p.error, p.surface, 4.5, 'mensaje de error'],
  [p.success, p.surface, 4.5, 'mensaje de éxito'],
  [p.focus, p.bg, 3, 'anillo de foco (no textual)'],
  [p.border, p.surface, 1.2, 'borde decorativo'],
  [p.control, p.surface, 3, 'borde de campos de formulario (no textual)'],
];

let fail = false;
const rows = [];
for (const [mode, p] of Object.entries(palette)) {
  for (const [fg, bg, min, use] of pairs(p)) {
    const r = ratio(fg, bg);
    const level = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA (no texto/grande)' : '—';
    const ok = r >= min;
    if (!ok) fail = true;
    rows.push(`${ok ? '✔' : '✘'} [${mode}] ${use}: ${fg} / ${bg} = ${r.toFixed(2)}:1 ${level}`);
  }
}
console.log(rows.join('\n'));
if (fail) {
  console.error('\nHay combinaciones que no cumplen el mínimo.');
  process.exit(1);
}
