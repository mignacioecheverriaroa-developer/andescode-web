// Configuración global del sitio. Los valores sensibles al despliegue vienen de variables de entorno
// (definidas en .github/workflows/deploy.yml) para no tocar código al cambiar de dominio.
const url = (process.env.SITE_URL || 'http://localhost:8080').replace(/\/$/, '');
const pathPrefix = process.env.PATH_PREFIX || '/';

export default {
  name: 'AndesCode',
  legalName: 'AndesCode',
  url,
  pathPrefix,
  // Correo corporativo. Vacío = se muestra un marcador "pendiente" en el sitio.
  email: process.env.CONTACT_EMAIL || 'andescode.chile@outlook.com',
  // ID del formulario de Formspree (https://formspree.io/f/<ID>). Vacío = el formulario
  // muestra un aviso y no se envía a ningún tercero.
  formspreeId: process.env.FORMSPREE_ID || '',
  locality: 'Santiago',
  region: 'Región Metropolitana',
  country: 'CL',
  countryName: { es: 'Chile', en: 'Chile' },
  parent: {
    name: 'SmartGrid Group',
    // Sin enlace mientras smartgridgroup.cl no tenga sitio publicado (evita un enlace roto).
    url: '',
    // Ruta del logo oficial; vacío = marcador de texto pendiente.
    logo: '',
  },
  github: 'https://github.com/mignacioecheverriaroa-netizen/andescode-web',
  themeColor: { light: '#F4F6F9', dark: '#0E1524' },
  buildYear: new Date().getFullYear(),
  updated: '2026-11-16',
};
