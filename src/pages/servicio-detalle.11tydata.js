// Datos calculados para cada página de detalle de servicio.
// (Las funciones son defensivas porque Eleventy las ejecuta primero con datos parciales.)
const svc = (d) => d.entry?.service?.[d.entry?.lang];

export default {
  eleventyComputed: {
    lang: (d) => d.entry?.lang,
    serviceId: (d) => d.entry?.service?.id,
    alternates: (d) => d.entry?.alternates,
    ogSlug: (d) => `service-${d.entry?.service?.id}-${d.entry?.lang}`,
    metaTitle: (d) => `${svc(d)?.short} — AndesCode`,
    metaDescription: (d) => svc(d)?.summary,
    breadcrumbs: (d) => {
      const lang = d.entry?.lang;
      const t = d.i18n?.[lang];
      const r = d.i18n?.routes;
      if (!t || !r) return [];
      return [
        { name: t.nav.home, url: r.home[lang] },
        { name: t.nav.services, url: r.services[lang] },
        { name: svc(d)?.short, url: d.entry.url },
      ];
    },
  },
};
