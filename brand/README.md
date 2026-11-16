# Guía de marca AndesCode

Los archivos fuente están en [`src/assets/brand/`](../src/assets/brand/) y se regeneran con `npm run brand`.

## Concepto

El isotipo es una **línea de cumbres** —la cordillera de los Andes tal como se ve desde Santiago— que termina en un **cursor de terminal**. Montaña y código en un solo trazo: construimos sobre bases sólidas y el trabajo sigue en curso.

## Variantes

| Archivo                                            | Uso                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------- |
| `andescode-horizontal.svg`                         | Uso principal en fondos claros (encabezados, documentos, firma de correo) |
| `andescode-horizontal-oscuro.svg`                  | Uso principal en fondos oscuros                                           |
| `andescode-vertical.svg` / `-oscuro.svg`           | Espacios cuadrados o altos (portadas, stands, redes)                      |
| `andescode-isotipo.svg`                            | Avatares, favicon, espacios muy reducidos                                 |
| `andescode-mono-claro.svg`                         | Una tinta (`#152033`) sobre fondos claros: impresión, sellos, grabados    |
| `andescode-mono-oscuro.svg`                        | Blanco sobre fondos oscuros o fotografías                                 |
| `andescode-isotipo-mono-claro.svg` / `-oscuro.svg` | Isotipo a una tinta                                                       |
| `andescode-perfil-512.png`                         | Foto de perfil (Outlook, GitHub, redes)                                   |

Íconos de la app: `src/favicon.svg` (cambia de color con el modo oscuro), `src/favicon.ico` (16/32/48), `src/assets/icons/apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` y versiones `-maskable`.

## Área de seguridad

Deja alrededor del logo un espacio libre igual a **la altura del cursor × 2** (≈ 1/6 de la altura del isotipo). Ningún texto, borde ni imagen debe entrar en esa zona.

```
┌───────────────────────────────────┐
│   ← x →                     ← x → │
│ x ┌──────────────────────────┐    │
│   │  ╱╲╱╲  AndesCode          │    │
│   │   ▬                       │    │
│   └──────────────────────────┘ x  │
└───────────────────────────────────┘
x = 2 × altura del cursor
```

## Tamaños mínimos

| Variante   | Pantalla        | Impresión |
| ---------- | --------------- | --------- |
| Horizontal | 120 px de ancho | 30 mm     |
| Vertical   | 80 px de ancho  | 20 mm     |
| Isotipo    | 16 px           | 5 mm      |

Bajo esos tamaños, usa solo el isotipo.

## Usos incorrectos

- No cambiar los colores fuera de la paleta ni aplicar degradados.
- No deformar, rotar ni inclinar el logo.
- No separar el cursor de la línea de cumbres ni moverlo de posición.
- No agregar sombras, contornos ni efectos 3D.
- No usar la versión clara sobre fondos claros ni la oscura sobre fondos oscuros.
- No colocar el logo sobre fotografías recargadas sin una base de color sólida.
- No reescribir el logotipo con otra tipografía.

## Paleta

| Nombre             | HEX       | RGB                | HSL                | Uso                                              |
| ------------------ | --------- | ------------------ | ------------------ | ------------------------------------------------ |
| Lapislázuli        | `#1F4E8C` | `rgb(31 78 140)`   | `hsl(214 64% 34%)` | Primario: isotipo, enlaces, botones (modo claro) |
| Lapislázuli claro  | `#8DB3EA` | `rgb(141 179 234)` | `hsl(215 69% 74%)` | Primario en modo oscuro                          |
| Ocre atacameño     | `#E0A030` | `rgb(224 160 48)`  | `hsl(38 74% 53%)`  | Cursor del isotipo, acentos                      |
| Ocre claro         | `#F2B84B` | `rgb(242 184 75)`  | `hsl(39 87% 62%)`  | Acento y foco en modo oscuro                     |
| Tinta              | `#152033` | `rgb(21 32 51)`    | `hsl(218 42% 14%)` | Texto y logotipo en fondos claros                |
| Nieve              | `#F4F6F9` | `rgb(244 246 249)` | `hsl(216 29% 97%)` | Fondo claro                                      |
| Noche cordillerana | `#0E1524` | `rgb(14 21 36)`    | `hsl(221 44% 10%)` | Fondo oscuro, íconos de app                      |
| Pizarra            | `#46536A` | `rgb(70 83 106)`   | `hsl(218 20% 35%)` | Texto secundario                                 |

El lapislázuli es la piedra nacional de Chile; el ocre remite al desierto de Atacama. Contrastes verificados con `npm run test:contrast` (todo el texto alcanza AAA).

Nunca uses el ocre para texto sobre fondo claro: su contraste es insuficiente. Úsalo solo como relleno con texto en tinta encima.

## Tipografía

**Archivo** (Omnibus-Type, licencia SIL Open Font License 1.1), variable con ejes de peso (100–900) y ancho (62–125).

- Logotipo y titulares: Archivo, peso ~780, ancho expandido (~118).
- Texto: Archivo, peso 400–420, ancho normal (100).
- En el sitio se sirve autoalojada como subconjunto latino en WOFF2 (`src/assets/fonts/archivo-var.woff2`).
- En documentos de oficina sin Archivo, usar Arial o Helvetica como respaldo.

## Relación con SmartGrid Group

AndesCode es una empresa de SmartGrid Group. En el pie de página del sitio se muestra "Una empresa de SmartGrid Group" junto al logo oficial del grupo (pendiente de recibir; mientras tanto se muestra un marcador visible).
