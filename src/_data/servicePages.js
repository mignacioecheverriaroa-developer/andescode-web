// Una entrada por servicio e idioma, para generar las páginas de detalle con una sola plantilla.
import { readFileSync } from 'node:fs';

const services = JSON.parse(readFileSync(new URL('./services.json', import.meta.url), 'utf8'));
const url = (s, lang) => (lang === 'es' ? `/servicios/${s.es.slug}/` : `/en/services/${s.en.slug}/`);

export default services.flatMap((s) =>
  ['es', 'en'].map((lang) => ({
    lang,
    service: s,
    url: url(s, lang),
    alternates: { es: url(s, 'es'), en: url(s, 'en') },
    related: services.filter((o) => o.group === s.group && o.id !== s.id).slice(0, 3),
  })),
);
