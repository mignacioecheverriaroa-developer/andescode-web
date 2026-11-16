# AndesCode — sitio web

Sitio corporativo bilingüe (español/inglés) de **AndesCode**, empresa de desarrollo de software y soluciones digitales de Santiago de Chile, parte de SmartGrid Group.

- Sitio: https://andescode.smartgridgroup.cl (mientras se configura el DNS: https://mignacioecheverriaroa-netizen.github.io/andescode-web/)
- Contacto: andescode.chile@outlook.com

## Características

- HTML5 + CSS moderno + JavaScript vanilla en módulos, compilado con [Eleventy](https://www.11ty.dev/) (solo para plantillas, minificación y hashing).
- Funciona sin JavaScript (mejora progresiva).
- Accesibilidad WCAG 2.2 AA (contraste AAA en texto), modo claro/oscuro con selector manual.
- Sin cookies, rastreadores ni scripts de terceros. Content-Security-Policy estricta.
- SEO: metadatos únicos, canonical, `hreflang`, Open Graph por página, JSON-LD (Organization, ProfessionalService/LocalBusiness, WebSite, BreadcrumbList), `sitemap.xml` y `robots.txt`.
- Portada de ~125 KB (presupuesto: 500 KB).

## Requisitos

- Node.js 20 o superior (CI usa Node 22).
- Google Chrome (para pruebas de accesibilidad, peso, capturas y Lighthouse). Ruta configurable con `CHROME_PATH`.
- Solo para regenerar la marca: Python 3 con `fonttools`, `brotli` y `Pillow`, y `rsvg-convert`.

## Uso

```bash
PUPPETEER_SKIP_DOWNLOAD=1 npm ci   # instalar dependencias sin descargar Chromium
npm run dev                        # servidor de desarrollo con recarga en http://localhost:8080
npm run build                      # compilar a dist/
npm run preview                    # servir dist/
npm run lint                       # html-validate, stylelint, eslint y prettier
npm run format                     # formatear con prettier
npm test                           # contraste, peso de página, enlaces rotos y pa11y (axe + HTML_CodeSniffer)
npm run test:lighthouse            # Lighthouse CI (umbrales 95/100/100/100)
node scripts/screenshots.mjs       # capturas en 360, 768, 1024, 1440 y 1920 px, claro y oscuro
npm run brand                      # regenerar logos, íconos e imágenes Open Graph
```

## Configuración

Variables de entorno usadas al compilar (en GitHub se definen como _variables del repositorio_):

| Variable        | Uso                                                                               | Valor por defecto             |
| --------------- | --------------------------------------------------------------------------------- | ----------------------------- |
| `SITE_URL`      | URL pública, para canonical, OG y sitemap                                         | `http://localhost:8080`       |
| `PATH_PREFIX`   | Subruta de publicación                                                            | `/`                           |
| `CUSTOM_DOMAIN` | (solo despliegue) dominio propio; activa `CNAME` y prefijo `/`                    | —                             |
| `FORMSPREE_ID`  | ID del formulario de Formspree; sin él, el formulario muestra un aviso y no envía | —                             |
| `CONTACT_EMAIL` | Correo de contacto                                                                | `andescode.chile@outlook.com` |

## Estructura

```
src/
├── pages/        index, nosotros, servicios, servicio-detalle, contacto, privacidad, 404
├── partials/     head, header, footer, cta, accordion, process, placeholder, jsonld
├── layouts/      base.njk
├── styles/       tokens.css, base.css, layout.css, components/, utilities.css (con @layer)
├── scripts/      módulos ES: nav, theme, form, back-to-top
├── _data/        site.js, i18n.js (textos es/en), services.json (los 10 servicios)
└── assets/       fonts, brand, icons, img
brand/README.md   guía de marca
docs/             arquitectura, contenido pendiente, DNS
scripts/          pruebas y utilidades
tools/brand/      generador de la marca
```

## Despliegue

- `ci.yml`: en cada PR y rama distinta de `main` ejecuta build, lint, pruebas y Lighthouse CI.
- `deploy.yml`: en cada push a `main` compila y publica `dist/` en GitHub Pages (modo "GitHub Actions").
- Dominio propio: ver [docs/DNS.md](docs/DNS.md).

## Licencia

El código está bajo licencia [MIT](LICENSE). Los textos, el logo y los elementos de marca de AndesCode y SmartGrid Group no están cubiertos por esa licencia: todos los derechos reservados. La fuente Archivo se distribuye bajo SIL Open Font License 1.1 ([`src/assets/fonts/OFL.txt`](src/assets/fonts/OFL.txt)).
