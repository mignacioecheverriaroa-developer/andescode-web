# Cómo contribuir

## Flujo de trabajo

1. Crea una rama desde `main`: `git switch -c feat/nombre-corto`.
2. Haz commits pequeños siguiendo [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `ci:`, `chore:`.
3. Antes de abrir el PR: `npm run build && npm run lint && npm test`.
4. Abre un Pull Request hacia `main`. El CI debe pasar para poder fusionar.
5. Al fusionar, el sitio se publica automáticamente.

## Convención CSS: CUBE CSS

Los estilos se organizan en capas (`@layer reset, tokens, base, layout, components, utilities`):

| Capa                     | Archivo                   | Qué va aquí                                                                                                 |
| ------------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **tokens**               | `styles/tokens.css`       | Variables de diseño. Ningún otro archivo define colores literales (salvo el pie de página, siempre oscuro). |
| **base**                 | `styles/base.css`         | Reset y estilos de elementos HTML.                                                                          |
| **layout** (Composition) | `styles/layout.css`       | Primitivas sin estética: `.wrapper`, `.stack`, `.cluster`, `.sidebar-layout`, `.split`, `.section`.         |
| **components** (Block)   | `styles/components/*.css` | Un archivo por bloque: `.card`, `.button`, `.accordion`, `.site-header`…                                    |
| **utilities** (Utility)  | `styles/utilities.css`    | Una responsabilidad: `.visually-hidden`, `.text-muted`, `.flow`.                                            |

**Exception**: variantes con modificador `--` (`.button--ghost`) o con atributos de estado (`[aria-expanded]`, `[data-visible]`, `[aria-current]`).

Nombres de clase: `bloque__elemento--modificador`, en minúsculas (lo verifica stylelint).

## Agregar un servicio (≈ 5 minutos)

1. Abre `src/_data/services.json` y agrega un objeto con: `id`, `group` (`build`, `maintain` o `advise`) y los bloques `es` y `en` (`slug`, `title`, `short`, `summary`, `includes`, `forWhom`, `faq`).
2. Ejecuta `npm run brand` para generar su imagen Open Graph.
3. `npm run dev` y revisa `/servicios/<slug>/` y `/en/services/<slug>/`.

La página de detalle, el menú, el pie de página, el formulario y el sitemap se actualizan solos.

## Agregar una página

1. Agrega la ruta en `src/_data/i18n.js` → `routes`, por ejemplo `cases: { es: '/casos/', en: '/en/cases/' }`.
2. Agrega los textos en `i18n.js` → `es.pages.cases` y `en.pages.cases` (al menos `title` y `description`) y el nombre en `nav`.
3. Crea `src/pages/casos.njk`:

   ```njk
   ---
   pageKey: cases
   permalink: "{{ i18n.routes.cases[lang] }}index.html"
   ---
   {%- set t = i18n[lang] -%}
   {%- set otherLang = 'en' if lang == 'es' else 'es' -%}
   {%- set p = t.pages.cases -%}
   <div class="page-intro wrapper stack">
     <h1>{{ p.heading }}</h1>
     <p class="lead measure">{{ p.lead }}</p>
   </div>
   {% include "cta.njk" %}
   ```

4. Agrega su entrada a `tools/brand/og-pages.mjs` y ejecuta `npm run brand`.
5. Agrega la URL a `.pa11yci.json` y `lighthouserc.json`.

Cada página se genera automáticamente en ambos idiomas, con canonical, `hreflang`, migas de pan y entrada en el sitemap.

## Contenido real pendiente

Usa el marcador visible en lugar de inventar contenido:

```njk
{%- set placeholderText = "Testimonios reales de clientes" %}
{% include "placeholder.njk" %}
```

Y registra el pendiente en `docs/CONTENIDO-PENDIENTE.md`. Nunca publiques testimonios, cifras, certificaciones o clientes que no sean reales y verificables.

## Paleta y contraste

Si cambias un color, actualiza `src/styles/tokens.css` **y** `scripts/palette.mjs`, y ejecuta `npm run test:contrast`.
