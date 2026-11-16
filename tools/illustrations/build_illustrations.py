"""Ilustraciones de línea (estilo "red de conectividad") para servicios, proceso y secciones.

Salida: src/assets/illustrations/<nombre>.svg — se insertan en línea (decorativas, aria-hidden)
para poder animarlas con CSS. Paleta: noche #0E1524, lapislázuli claro #8DB3EA, ocre #F2B84B.
Uso: python3 tools/illustrations/build_illustrations.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / "src/assets/illustrations"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 480, 300


def frame(body, grid=True):
    dots = ""
    if grid:
        dots = "".join(
            f'<circle cx="{x}" cy="{y}" r="1" class="il-dot"/>' for x in range(24, W, 32) for y in range(22, H, 32)
        )
    return (
        f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" class="il">'
        f'<rect width="{W}" height="{H}" rx="18" class="il-bg"/>{dots}{body}</svg>\n'
    )


def node(x, y, r=4, accent=False, pulse=False):
    cls = "il-node" + (" il-node--accent" if accent else "") + (" il-pulse" if pulse else "")
    return f'<circle cx="{x}" cy="{y}" r="{r}" class="{cls}"/>'


def line(d, cls="il-line", draw=False):
    extra = ' pathLength="1"' if draw else ""
    return f'<path d="{d}" class="{cls}{" il-draw" if draw else ""}"{extra}/>'


def window(x, y, w, h):
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" class="il-shape"/>'
        f'<path d="M{x} {y + 26}H{x + w}" class="il-line"/>'
        + "".join(node(x + 16 + i * 14, y + 13, 3.5, accent=(i == 0)) for i in range(3))
    )


def network(points, links, accent=()):
    out = "".join(line(f"M{points[a][0]} {points[a][1]}L{points[b][0]} {points[b][1]}", "il-line il-flow") for a, b in links)
    out += "".join(node(x, y, 5, accent=i in accent, pulse=i in accent) for i, (x, y) in enumerate(points))
    return out


art = {}

# --- Servicios ---
art["sitios-web"] = frame(
    window(70, 50, 340, 200)
    + '<rect x="94" y="96" width="150" height="16" rx="4" class="il-fill"/>'
    + '<rect x="94" y="122" width="200" height="8" rx="4" class="il-soft"/><rect x="94" y="138" width="170" height="8" rx="4" class="il-soft"/>'
    + '<rect x="94" y="162" width="80" height="26" rx="6" class="il-accent-fill"/>'
    + '<rect x="300" y="96" width="86" height="92" rx="8" class="il-shape"/>'
    + line("M310 172L330 146L346 160L362 136L378 172", "il-line", True)
    + '<rect x="94" y="206" width="90" height="28" rx="6" class="il-shape"/><rect x="194" y="206" width="90" height="28" rx="6" class="il-shape"/><rect x="294" y="206" width="90" height="28" rx="6" class="il-shape"/>'
)
art["aplicaciones"] = frame(
    window(60, 60, 250, 180)
    + '<rect x="84" y="106" width="110" height="12" rx="4" class="il-fill"/><rect x="84" y="128" width="190" height="8" rx="4" class="il-soft"/>'
    + '<rect x="84" y="150" width="56" height="56" rx="8" class="il-shape"/><rect x="150" y="150" width="56" height="56" rx="8" class="il-shape"/><rect x="216" y="150" width="56" height="56" rx="8" class="il-shape"/>'
    + '<rect x="320" y="70" width="104" height="196" rx="16" class="il-shape il-float"/>'
    + '<rect x="336" y="96" width="72" height="10" rx="4" class="il-fill il-float"/><rect x="336" y="116" width="56" height="8" rx="4" class="il-soft il-float"/>'
    + '<rect x="336" y="200" width="72" height="22" rx="6" class="il-accent-fill il-float"/>'
    + node(372, 160, 14, accent=True, pulse=True)
)
art["software-a-medida"] = frame(
    '<rect x="50" y="60" width="110" height="64" rx="10" class="il-shape"/><rect x="185" y="118" width="110" height="64" rx="10" class="il-shape"/>'
    '<rect x="320" y="60" width="110" height="64" rx="10" class="il-shape"/><rect x="50" y="190" width="110" height="64" rx="10" class="il-shape"/>'
    '<rect x="320" y="190" width="110" height="64" rx="10" class="il-shape"/>'
    + "".join(f'<rect x="{x + 16}" y="{y + 18}" width="{w}" height="8" rx="4" class="il-soft"/>' for x, y, w in [(50, 60, 60), (185, 118, 70), (320, 60, 50), (50, 190, 70), (320, 190, 60)])
    + line("M160 92H200V118", "il-line il-flow")
    + line("M320 92H280V118", "il-line il-flow")
    + line("M160 222H200V182", "il-line il-flow")
    + line("M320 222H280V182", "il-line il-flow")
    + node(240, 150, 9, accent=True, pulse=True)
)
art["videojuegos"] = frame(
    line("M150 110H330C370 110 392 150 400 190C408 230 380 246 356 228L322 200H158L124 228C100 246 72 230 80 190C88 150 110 110 150 110Z", "il-line il-line--bold", True)
    + line("M148 146V182M130 164H166", "il-line il-line--bold")
    + node(316, 138, 7, accent=True, pulse=True)
    + node(338, 158, 7)
    + node(294, 158, 7)
    + node(316, 178, 7)
    + "".join(f'<rect x="{200 + i * 22}" y="56" width="14" height="14" rx="2" class="{"il-accent-fill" if i == 2 else "il-fill"} il-blink b{i}"/>' for i in range(4))
)
art["mantenimiento"] = frame(
    window(60, 50, 360, 200)
    + line("M84 190H150L168 150L190 222L214 120L236 190H300L316 170L330 190H396", "il-line il-line--accent il-line--bold", True)
    + '<rect x="84" y="96" width="70" height="26" rx="6" class="il-shape"/><rect x="164" y="96" width="70" height="26" rx="6" class="il-shape"/><rect x="244" y="96" width="70" height="26" rx="6" class="il-shape"/>'
    + node(104, 109, 5, accent=True, pulse=True)
    + node(184, 109, 5)
    + node(264, 109, 5)
)
art["optimizacion"] = frame(
    line("M120 220A120 120 0 0 1 360 220", "il-line il-line--bold")
    + line("M120 220A120 120 0 0 1 330 150", "il-line il-line--accent il-line--bold", True)
    + "".join(line(f"M{240 + 104 * c} {220 - 104 * s}L{240 + 120 * c} {220 - 120 * s}", "il-line") for c, s in [(-1, 0), (-0.71, 0.71), (0, 1), (0.71, 0.71), (1, 0)])
    + '<g class="il-needle">' + line("M240 220L318 158", "il-line il-line--accent il-line--bold") + "</g>"
    + node(240, 220, 10, accent=True)
    + '<rect x="190" y="244" width="100" height="10" rx="5" class="il-soft"/>'
)
art["auditorias"] = frame(
    line("M240 52L330 86V150C330 200 292 236 240 252C188 236 150 200 150 150V86Z", "il-line il-line--bold", True)
    + line("M200 152L228 180L284 124", "il-line il-line--accent il-line--bold", True)
    + '<rect x="120" y="0" width="240" height="3" class="il-scan"/>'
    + node(110, 90, 5)
    + node(370, 90, 5)
    + node(90, 200, 5)
    + node(390, 200, 5)
    + line("M110 90L150 100M370 90L330 100M90 200L160 180M390 200L320 180", "il-line il-flow")
)
art["administracion"] = frame(
    "".join(
        f'<rect x="150" y="{y}" width="180" height="50" rx="10" class="il-shape"/>'
        f'<rect x="170" y="{y + 20}" width="70" height="10" rx="4" class="il-soft"/>'
        + node(296, y + 25, 6, accent=(i == 0), pulse=(i == 0))
        + node(276, y + 25, 6)
        for i, y in enumerate([60, 125, 190])
    )
    + line("M330 85H390V215H330M150 150H90", "il-line il-flow")
    + node(390, 150, 6)
    + node(90, 150, 6, accent=True)
)
art["integraciones"] = frame(
    network(
        [(240, 150), (110, 80), (110, 220), (370, 80), (370, 220), (240, 50), (240, 250)],
        [(0, 1), (0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (1, 5), (3, 5), (2, 6), (4, 6)],
        accent=(0,),
    )
    + "".join(f'<rect x="{x - 34}" y="{y - 18}" width="68" height="36" rx="8" class="il-shape"/>' for x, y in [(110, 80), (110, 220), (370, 80), (370, 220)])
    + '<text x="240" y="155" class="il-code" text-anchor="middle">{ }</text>'
)
art["transformacion-digital"] = frame(
    line("M70 240C140 240 130 160 200 160S270 90 330 90S390 60 420 50", "il-line il-line--bold il-dash", True)
    + node(70, 240, 7)
    + node(200, 160, 7)
    + node(330, 90, 7)
    + node(420, 50, 10, accent=True, pulse=True)
    + "".join(f'<rect x="{x}" y="{y}" width="70" height="24" rx="6" class="il-shape"/>' for x, y in [(40, 196), (172, 118), (300, 48)])
)

# --- Proceso ---
art["proceso-descubrir"] = frame(
    "".join(f'<rect x="{x}" y="{y}" width="70" height="56" rx="6" class="{c}"/>' for x, y, c in [(70, 60, "il-shape"), (156, 74, "il-shape"), (90, 140, "il-accent-soft"), (176, 156, "il-shape")])
    + line("M300 90A50 50 0 1 1 299.9 90", "il-line il-line--bold")
    + line("M336 176L392 232", "il-line il-line--accent il-line--bold")
    + node(300, 140, 6, accent=True, pulse=True)
)
art["proceso-disenar"] = frame(
    window(60, 50, 260, 200)
    + '<rect x="84" y="100" width="100" height="70" rx="6" class="il-dash-rect"/><rect x="196" y="100" width="100" height="30" rx="6" class="il-dash-rect"/>'
    + '<rect x="196" y="140" width="100" height="30" rx="6" class="il-dash-rect"/><rect x="84" y="186" width="212" height="40" rx="6" class="il-dash-rect"/>'
    + line("M350 230L400 90L420 98L370 238Z", "il-line il-line--accent", True)
    + node(400, 90, 5, accent=True)
)
art["proceso-desarrollar"] = frame(
    window(60, 50, 360, 200)
    + '<text x="88" y="120" class="il-code">&lt;/&gt;</text>'
    + "".join(f'<rect x="{x}" y="{y}" width="{w}" height="9" rx="4" class="{c} il-type t{i}"/>' for i, (x, y, w, c) in enumerate([(150, 106, 150, "il-fill"), (170, 128, 190, "il-soft"), (170, 150, 120, "il-accent-fill"), (150, 172, 90, "il-soft"), (170, 194, 170, "il-soft"), (150, 216, 60, "il-fill")]))
)
art["proceso-entregar"] = frame(
    line("M240 60L280 110V200H200V110Z", "il-line il-line--bold", True)
    + line("M200 170L170 210V230L200 210M280 170L310 210V230L280 210", "il-line")
    + node(240, 130, 12, accent=True, pulse=True)
    + line("M220 214Q240 260 260 214", "il-line il-line--accent il-flame")
    + "".join(node(x, y, 2.5) for x, y in [(90, 70), (130, 200), (360, 90), (400, 190), (330, 240)])
)
art["proceso-acompanar"] = frame(
    window(70, 60, 340, 180)
    + line("M94 200L150 170L200 186L260 130L320 150L386 104", "il-line il-line--accent il-line--bold", True)
    + "".join(node(x, y, 6, accent=(i == 5), pulse=(i == 5)) for i, (x, y) in enumerate([(94, 200), (150, 170), (200, 186), (260, 130), (320, 150), (386, 104)]))
)
# --- Secciones ---
art["nosotros"] = frame(
    network(
        [(80, 200), (150, 120), (210, 170), (270, 80), (340, 150), (400, 110), (240, 240), (130, 250), (360, 240)],
        [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (2, 6), (6, 7), (6, 8), (0, 7), (4, 8), (1, 3)],
        accent=(3, 6),
    )
)

for name, svg in art.items():
    (OUT / f"{name}.svg").write_text(svg, encoding="utf-8")
print(f"{len(art)} ilustraciones generadas")
