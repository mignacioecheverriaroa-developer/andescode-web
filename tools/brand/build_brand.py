"""Genera el sistema de marca de AndesCode.

Salidas en src/assets/brand/ (SVG) y src/ (íconos de la app) y src/assets/img/og/.
Uso: python3 tools/brand/build_brand.py   (luego `npx svgo` optimiza los SVG)
Requiere: fontTools, Pillow, rsvg-convert y las fuentes de tools/brand instaladas en fontconfig.
"""
import json
import subprocess
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
BRAND = ROOT / "src/assets/brand"
ICONS = ROOT / "src/assets/icons"
OG = ROOT / "src/assets/img/og"
for d in (BRAND, ICONS, OG):
    d.mkdir(parents=True, exist_ok=True)

INK, LAPIS, OCHRE, SNOW, NIGHT = "#152033", "#1F4E8C", "#E0A030", "#F4F6F9", "#0E1524"
LAPIS_DARK, OCHRE_DARK, INK_DARK = "#8DB3EA", "#F2B84B", "#E9EEF6"

# --- Isotipo: línea de cumbres (Andes) que termina en un cursor de terminal (código) ---
RIDGE = "M6 46 L20 24 L28.5 34 L41 13 L58 46"


def iso(ridge, cursor, x=0, y=0, s=1.0, cls=False):
    rc = ' class="r"' if cls else ""
    cc = ' class="c"' if cls else ""
    return (
        f'<g transform="translate({x} {y}) scale({s})">'
        f'<path{rc} d="{RIDGE}" fill="none" stroke="{ridge}" stroke-width="6.5" '
        f'stroke-linecap="round" stroke-linejoin="round"/>'
        f'<rect{cc} x="43" y="52" width="15" height="5.5" rx="1.6" fill="{cursor}"/></g>'
    )


# --- Wordmark convertido a trazos (no depende de fuentes instaladas) ---
font = TTFont(ROOT / "tools/brand/ArchivoExp-Bold.ttf")
gs = font.getGlyphSet()
cmap = font.getBestCmap()
UPM = font["head"].unitsPerEm
CAP = font["OS/2"].sCapHeight


def text_path(text, size, tracking=0.0):
    """Devuelve (d, ancho) del texto en px con tamaño `size` (altura em)."""
    scale = size / UPM
    pen = SVGPathPen(gs)
    x = 0.0
    for ch in text:
        gname = cmap[ord(ch)]
        tp = TransformPen(pen, (scale, 0, 0, -scale, x, 0))
        gs[gname].draw(tp)
        x += gs[gname].width * scale + tracking * size
    return pen.getCommands(), x - tracking * size


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" '
        f'width="{w:.0f}" height="{h:.0f}" role="img" aria-labelledby="t">'
        f'<title id="t">{title}</title>{body}</svg>\n'
    )


WORD = "AndesCode"
size = 48
d_word, w_word = text_path(WORD, size, tracking=-0.005)
cap_px = CAP * size / UPM


def horizontal(ridge, cursor, ink):
    h = 64
    gap = 16
    baseline = 32 + cap_px / 2
    body = iso(ridge, cursor) + (
        f'<path d="{d_word}" fill="{ink}" transform="translate({64 + gap} {baseline:.2f})"/>'
    )
    return svg(64 + gap + w_word + 2, h, body, "AndesCode")


def vertical(ridge, cursor, ink):
    w = max(w_word, 96) + 8
    isz = 96
    body = iso(ridge, cursor, x=(w - isz) / 2, y=0, s=isz / 64)
    baseline = isz + 20 + cap_px
    body += f'<path d="{d_word}" fill="{ink}" transform="translate({(w - w_word) / 2:.2f} {baseline:.2f})"/>'
    return svg(w, baseline + 6, body, "AndesCode")


variants = {
    "andescode-horizontal.svg": horizontal(LAPIS, OCHRE, INK),
    "andescode-horizontal-oscuro.svg": horizontal(LAPIS_DARK, OCHRE_DARK, INK_DARK),
    "andescode-vertical.svg": vertical(LAPIS, OCHRE, INK),
    "andescode-vertical-oscuro.svg": vertical(LAPIS_DARK, OCHRE_DARK, INK_DARK),
    "andescode-isotipo.svg": svg(64, 64, iso(LAPIS, OCHRE), "AndesCode"),
    "andescode-mono-claro.svg": horizontal(INK, INK, INK),  # para fondos claros
    "andescode-mono-oscuro.svg": horizontal("#FFFFFF", "#FFFFFF", "#FFFFFF"),  # para fondos oscuros
    "andescode-isotipo-mono-claro.svg": svg(64, 64, iso(INK, INK), "AndesCode"),
    "andescode-isotipo-mono-oscuro.svg": svg(64, 64, iso("#FFFFFF", "#FFFFFF"), "AndesCode"),
}
for name, content in variants.items():
    (BRAND / name).write_text(content, encoding="utf-8")

# Logo para el encabezado: usa currentColor para el texto y variables CSS para el isotipo.
header = svg(
    64 + 16 + w_word + 2,
    64,
    '<g class="logo-iso">'
    + iso("var(--logo-ridge,#1F4E8C)", "var(--logo-cursor,#E0A030)")
    + "</g>"
    + f'<path d="{d_word}" fill="currentColor" transform="translate(80 {32 + cap_px / 2:.2f})"/>',
    "AndesCode",
)
(BRAND / "andescode-header.svg").write_text(header, encoding="utf-8")

# --- favicon.svg con modo oscuro interno ---
fav = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    "<style>.r{stroke:#1F4E8C}.c{fill:#E0A030}"
    "@media (prefers-color-scheme:dark){.r{stroke:#8DB3EA}.c{fill:#F2B84B}}</style>"
    + iso("#1F4E8C", "#E0A030", cls=True)
    + "</svg>\n"
)
(ROOT / "src/favicon.svg").write_text(fav, encoding="utf-8")  # no pasar por SVGO: conserva la media query


def render(svg_text, out_png, w, h=None):
    tmp = out_png.with_suffix(".tmp.svg")
    tmp.write_text(svg_text, encoding="utf-8")
    args = ["rsvg-convert", "-w", str(w)]
    if h:
        args += ["-h", str(h)]
    subprocess.run(args + ["-o", str(out_png), str(tmp)], check=True)
    tmp.unlink()


def app_icon(px, pad_ratio, bg):
    """Ícono cuadrado con fondo sólido; pad_ratio controla la zona segura."""
    inner = 64 * (1 - 2 * pad_ratio)
    off = 64 * pad_ratio
    body = f'<rect width="64" height="64" fill="{bg}"/>' + iso(LAPIS_DARK, OCHRE_DARK, x=off, y=off, s=inner / 64)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>'


render(app_icon(180, 0.16, NIGHT), ICONS / "apple-touch-icon.png", 180)
render(app_icon(192, 0.14, NIGHT), ICONS / "icon-192.png", 192)
render(app_icon(512, 0.14, NIGHT), ICONS / "icon-512.png", 512)
# Maskable: contenido dentro del 80 % central (radio de la zona segura).
render(app_icon(512, 0.24, NIGHT), ICONS / "icon-512-maskable.png", 512)
render(app_icon(192, 0.24, NIGHT), ICONS / "icon-192-maskable.png", 192)

# favicon.ico (16, 32, 48) — fondo transparente, isotipo claro
fav_png = ICONS / "favicon-48.png"
render(svg(64, 64, iso(LAPIS, OCHRE), "AndesCode"), fav_png, 256)
Image.open(fav_png).save(ROOT / "src/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
fav_png.unlink()

# Foto de perfil (para Outlook/GitHub): 512 px
render(app_icon(512, 0.2, NIGHT), BRAND / "andescode-perfil-512.png", 512)

# --- Imágenes Open Graph 1200x630 por página ---
pages = json.loads((ROOT / "tools/brand/og-pages.json").read_text(encoding="utf-8"))


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def wrap(text, limit):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > limit and cur:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    lines.append(cur)
    return lines


def og_svg(title, kicker):
    lines = wrap(title, 24)[:3]
    tsize = 76 if len(lines) <= 2 else 64
    text = "".join(
        f'<text x="80" y="{290 + i * (tsize + 8)}" font-family="ArchivoExp-Bold" '
        f'font-size="{tsize}" fill="#E9EEF6">{esc(line)}</text>'
        for i, line in enumerate(lines)
    )
    ridge_bg = (
        '<path d="M0 560 L140 470 L230 520 L380 400 L470 470 L620 360 L760 455 L860 410 '
        'L1000 330 L1200 470 L1200 630 L0 630Z" fill="#162036"/>'
        '<path d="M0 600 L180 520 L300 570 L460 480 L600 560 L760 470 L900 540 L1050 470 '
        'L1200 540 L1200 630 L0 630Z" fill="#1F2C47"/>'
    )
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">'
        f'<rect width="1200" height="630" fill="{NIGHT}"/>{ridge_bg}'
        + iso(LAPIS_DARK, OCHRE_DARK, x=80, y=70, s=1.1)
        + f'<path d="{d_word}" fill="#E9EEF6" transform="translate(170 {105 + cap_px / 2:.1f}) scale(0.9)"/>'
        f'<text x="80" y="200" font-family="Archivo-Semi" font-size="30" fill="#F2B84B">{esc(kicker)}</text>'
        + text
        + "</svg>"
    )


for p in pages:
    png = OG / f"{p['slug']}.png"
    render(og_svg(p["title"], p["kicker"]), png, 1200, 630)
    Image.open(png).convert("RGB").save(OG / f"{p['slug']}.jpg", quality=82, optimize=True, progressive=True)
    png.unlink()

print(f"Marca generada: {len(variants) + 2} SVG, íconos, {len(pages)} og-images")

# --- Ilustración "Andes al amanecer" (fuente raster para <picture> en Nosotros) ---
illus = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#1F4E8C"/><stop offset="0.55" stop-color="#6F8FBF"/><stop offset="0.85" stop-color="#F2C27A"/><stop offset="1" stop-color="#E0A030"/></linearGradient></defs>
<rect width="1600" height="1000" fill="url(#sky)"/>
<circle cx="1180" cy="560" r="70" fill="#F7D79A" opacity="0.9"/>
<path d="M0 640 L120 560 L230 600 L360 470 L450 530 L560 400 L690 500 L800 380 L930 470 L1040 420 L1160 500 L1290 400 L1420 480 L1600 430 V1000 H0Z" fill="#7F96B8"/>
<path d="M560 400 L600 440 L575 445 L540 425Z M800 380 L840 425 L812 430 L780 405Z M1290 400 L1330 440 L1300 446 L1270 420Z" fill="#F4F6F9"/>
<path d="M0 740 L160 650 L290 700 L440 600 L580 680 L720 590 L870 670 L1010 610 L1160 690 L1310 610 L1450 670 L1600 630 V1000 H0Z" fill="#3E5A86"/>
<path d="M0 840 L200 760 L360 810 L540 740 L700 800 L880 730 L1060 800 L1240 740 L1420 800 L1600 760 V1000 H0Z" fill="#1F4E8C"/>
<path d="M0 930 L240 870 L460 910 L700 860 L940 910 L1180 865 L1400 905 L1600 880 V1000 H0Z" fill="#152033"/>
</svg>'''
render(illus, ROOT / "src/assets/img/andes-amanecer.png", 1600, 1000)
print("Ilustración generada")

# --- Logo para la firma de correo (PNG: Outlook no muestra SVG) ---
subprocess.run(
    ["rsvg-convert", "-h", "96", "-o", str(BRAND / "andescode-firma.png"), str(BRAND / "andescode-horizontal.svg")],
    check=True,
)
