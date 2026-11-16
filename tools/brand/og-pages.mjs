// Genera tools/brand/og-pages.json (títulos de las imágenes Open Graph) a partir de los datos del sitio.
import { writeFileSync, readFileSync } from 'node:fs';
import i18n from '../../src/_data/i18n.js';

const services = JSON.parse(readFileSync(new URL('../../src/_data/services.json', import.meta.url)));
const out = [];
for (const lang of i18n.langs) {
  const t = i18n[lang];
  const p = t.pages;
  out.push({
    slug: `home-${lang}`,
    kicker: lang === 'es' ? 'Santiago de Chile' : 'Santiago, Chile',
    title: p.home.heroTitle,
  });
  out.push({
    slug: `about-${lang}`,
    kicker: t.nav.about,
    title: p.about.lead.split(' para ')[0].split(' for ')[0],
  });
  out.push({ slug: `projects-${lang}`, kicker: t.nav.projects, title: p.projects.lead.split('.')[0] });
  out.push({ slug: `services-${lang}`, kicker: t.nav.services, title: p.services.lead });
  out.push({ slug: `contact-${lang}`, kicker: t.nav.contact, title: t.ui.ctaTitle });
  out.push({ slug: `privacy-${lang}`, kicker: t.nav.privacy, title: p.privacy.heading });
  for (const s of services) {
    out.push({ slug: `service-${s.id}-${lang}`, kicker: t.nav.services, title: s[lang].short });
  }
}
writeFileSync(new URL('./og-pages.json', import.meta.url), JSON.stringify(out, null, 2));
console.log(`${out.length} páginas para og-image`);
