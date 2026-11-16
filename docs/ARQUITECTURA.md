# AndesCode — Descubrimiento y arquitectura (Fase 0)

## 1. Objetivos del sitio

1. **Conseguir conversaciones con clientes nuevos**: cada página termina en una vía clara hacia el formulario de contacto.
2. **Explicar con claridad qué hacemos**: diez áreas de servicio agrupadas en tres momentos del ciclo de vida de un proyecto (construir, mantener, asesorar).
3. **Transmitir continuidad**: el diferencial de AndesCode es que el trabajo no termina con la entrega.
4. **Generar confianza sin inventar nada**: sin cifras, clientes ni testimonios ficticios; los huecos se muestran como marcadores visibles hasta tener contenido real.
5. **Ser bilingüe** (español por defecto, inglés en `/en/`) y respaldar la marca SmartGrid Group.

KPI sugeridos: envíos del formulario, clics en correo, visitas a páginas de servicio.

## 2. Mapa del sitio

```
/                              Inicio
├── /nosotros/                 Nosotros (misión, forma de trabajo, SmartGrid Group)
├── /servicios/                Servicios (índice agrupado)
│   └── /servicios/<slug>/     Detalle de cada uno de los 10 servicios (plantilla única)
├── /contacto/                 Contacto (formulario + datos)
├── /privacidad/               Política de privacidad
└── /404.html                  Página no encontrada

/en/                           Mismo árbol en inglés:
/en/about/, /en/services/, /en/services/<slug>/, /en/contact/, /en/privacy/
```

Slugs de servicio (es → en): `sitios-web` → `websites`, `aplicaciones-web-y-moviles` → `web-and-mobile-apps`, `software-a-medida` → `custom-software`, `videojuegos` → `video-games`, `mantenimiento-y-soporte` → `maintenance-and-support`, `actualizacion-y-optimizacion` → `upgrades-and-optimization`, `auditorias` → `audits`, `administracion-de-plataformas` → `platform-management`, `integraciones-y-automatizacion` → `integrations-and-automation`, `transformacion-digital` → `digital-transformation`.

## 3. Wireframes en texto

Concepto de diseño: la cordillera de los Andes vista desde Santiago, siempre al oriente. Su línea de cumbres es el único gesto audaz del sitio (en el hero); el resto es sobrio, alineado a la izquierda y con mucho aire.

### Inicio

```
┌──────────────────────────────────────────────────────────────┐
│ [skip link]                                                  │
│ [Isotipo] AndesCode   Servicios▾ Nosotros Contacto  ES|EN ◐  │
├──────────────────────────────────────────────────────────────┤
│ H1: Software que se construye, se mantiene y crece contigo   │
│ Bajada: sitios, apps, software a medida y videojuegos…       │
│ [Conversemos tu proyecto] [Ver servicios]                    │
│ ╱╲  ╱╲╱╲    ╱╲      (línea de cumbres SVG, ancho completo)   │
├──────────────────────────────────────────────────────────────┤
│ H2: Qué hacemos                                              │
│  Construimos │ Mantenemos │ Asesoramos   (3 columnas → 1)    │
│  · servicio  │ · servicio │ · servicio   (enlaces a detalle) │
├──────────────────────────────────────────────────────────────┤
│ H2: Cómo trabajamos   (secuencia real 1→5)                   │
│ 1 Descubrir 2 Diseñar 3 Desarrollar 4 Entregar 5 Acompañar   │
├──────────────────────────────────────────────────────────────┤
│ H2: Preguntas frecuentes  (details/summary)                  │
├──────────────────────────────────────────────────────────────┤
│ Banda CTA: ¿Tienes una idea? [Escríbenos]                    │
├──────────────────────────────────────────────────────────────┤
│ Footer: marca · navegación · contacto · idioma ·             │
│         "Una empresa de SmartGrid Group" [logo SGG]          │
│                                         [volver arriba ↑]    │
└──────────────────────────────────────────────────────────────┘
```

### Nosotros

```
Migas: Inicio › Nosotros
H1 Nosotros + bajada
Misión (cita destacada)        | Ilustración <picture> (AVIF/WebP/JPG)
Principios: funcionalidad, eficiencia, seguridad, escalabilidad (lista de definición)
Relación de largo plazo (texto)
SmartGrid Group: párrafo + logo
[Marcador visible: equipo y fotos reales pendientes]
CTA
```

### Servicios (índice)

```
Migas · H1 · bajada
Grupo "Construimos": tarjetas enlace (título + resumen)
Grupo "Mantenemos": …
Grupo "Asesoramos": …
CTA
```

### Detalle de servicio (plantilla)

```
Migas: Inicio › Servicios › <Servicio>
H1 <Servicio> + resumen
Qué incluye (lista) | Para quién es (lista)
Cómo lo abordamos (pasos)
Preguntas frecuentes (acordeón)
Servicios relacionados (2–3 enlaces)
[Marcador: casos reales pendientes]
CTA → contacto con el servicio preseleccionado (?servicio=slug)
```

### Contacto

```
Migas · H1 · bajada
Formulario (nombre, correo, empresa opc., servicio, mensaje,
            consentimiento + enlace a privacidad, honeypot oculto)
Región aria-live para estado
Aside: correo, ubicación (Santiago, Chile), tiempo de respuesta [pendiente]
```

### Privacidad

```
Migas · H1 · fecha de actualización · secciones con índice en página
```

### 404

```
H1 Página no encontrada · texto útil · enlaces a Inicio, Servicios, Contacto
```

## 4. Design tokens

### Color (verificado con `npm run test:contrast`)

| Token             | Claro                      | Oscuro                         | Uso                  |
| ----------------- | -------------------------- | ------------------------------ | -------------------- |
| `--color-bg`      | `#F4F6F9` (nieve)          | `#0E1524` (noche cordillerana) | Fondo                |
| `--color-surface` | `#FFFFFF`                  | `#162036`                      | Superficies          |
| `--color-ink`     | `#152033`                  | `#E9EEF6`                      | Texto principal      |
| `--color-muted`   | `#46536A`                  | `#A9B6CA`                      | Texto secundario     |
| `--color-primary` | `#1F4E8C` (lapislázuli)    | `#8DB3EA`                      | Enlaces, botones     |
| `--color-accent`  | `#E0A030` (ocre atacameño) | `#F2B84B`                      | Acentos, foco oscuro |
| `--color-border`  | `#CBD3DF`                  | `#2B3A55`                      | Bordes decorativos   |
| `--color-control` | `#6B7891`                  | `#7D8BA5`                      | Bordes de campos     |
| `--color-error`   | `#A1261F`                  | `#FF9C94`                      | Errores              |
| `--color-success` | `#175A31`                  | `#7FD49B`                      | Éxito                |

El lapislázuli es la piedra nacional de Chile; el ocre remite al desierto de Atacama. Se evita a propósito el cliché "azul tech + gradiente".

### Contraste

Todas las combinaciones de texto alcanzan **AAA (≥ 7:1)** en ambos modos. Los indicadores no textuales (foco, bordes de campos) superan 3:1.

### Tipografía

- **Archivo** (variable, ejes `wght` 100–900 y `wdth` 62–125), autoalojada en WOFF2, subconjunto latino (~70 KB), `font-display: swap`, con preload.
- Titulares en ancho expandido (`wdth` 112–125) y peso 700–800: la tipografía es parte de la identidad.
- Cuerpo en ancho normal, peso 400, interlineado 1.6, medida máxima 68ch.
- Escala fluida con `clamp()` (razón ~1.25):
  `--step--1` 0.83–0.9rem · `--step-0` 1–1.125rem · `--step-1` 1.25–1.4rem · `--step-2` 1.56–1.9rem · `--step-3` 1.95–2.6rem · `--step-4` 2.44–3.6rem · `--step-5` 3–4.8rem

### Espaciado (fluido)

`--space-3xs` 0.25rem · `--space-2xs` 0.5rem · `--space-xs` 0.75rem · `--space-s` 1rem · `--space-m` 1.5rem · `--space-l` 2rem · `--space-xl` 3rem · `--space-2xl` 4–6rem (fluido)

### Radios

`--radius-s` 4px (campos) · `--radius-m` 10px (tarjetas) · `--radius-pill` 999px (chips, botón volver arriba). Jerarquía deliberada, no un único radio para todo.

### Sombras

`--shadow-1` sutil para tarjetas en hover/foco; `--shadow-2` para menús desplegables. En modo oscuro se reemplazan por bordes más claros.

## 5. Estrategia de contenidos

- **Voz**: cercana, directa, en segunda persona ("tu proyecto"), verbos activos, sin jerga innecesaria. En inglés, mismo tono.
- **Estructura**: cada página responde _qué es_, _para quién_, _cómo_ y _siguiente paso_.
- **Honestidad**: no se publican testimonios, cifras, certificaciones ni clientes no verificados. Los espacios para ellos se muestran con el componente `placeholder` (borde punteado + texto "Contenido pendiente") y se listan en `docs/CONTENIDO-PENDIENTE.md`.
- **SEO**: un H1 por página, títulos ≤ 60 caracteres, descripciones ≤ 155, palabras clave locales ("desarrollo de software en Santiago de Chile").
- **Inclusión**: lenguaje neutro cuando es posible ("clientes", "personas", "equipos").
- **Mantenimiento**: textos de servicios en un solo archivo de datos (`src/_data/services.json`) por idioma; agregar un servicio = agregar un objeto.
