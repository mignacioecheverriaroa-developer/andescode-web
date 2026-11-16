// Datos comunes a todas las páginas: una página por idioma, URLs alternativas y migas de pan.
export default {
  layout: 'base.njk',
  pagination: { data: 'i18n.langs', size: 1, alias: 'lang' },
  eleventyComputed: {
    alternates: (data) => data.i18n?.routes?.[data.pageKey],
    breadcrumbs: (data) => {
      const t = data.i18n?.[data.lang];
      if (!t || data.pageKey === 'home' || data.pageKey === 'notFound') return [];
      return [
        { name: t.nav.home, url: data.i18n.routes.home[data.lang] },
        { name: t.nav[data.pageKey], url: data.i18n.routes[data.pageKey][data.lang] },
      ];
    },
  },
};
