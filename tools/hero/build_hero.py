"""Genera la ilustración del hero: la cordillera y una ciudad dibujadas como redes de conectividad.

Salida: src/partials/hero-art.svg (se inserta en línea para animarla con CSS).
Uso: python3 tools/hero/build_hero.py
Es determinista (semilla fija): volver a ejecutarlo produce el mismo archivo.
"""
import math
import random
from pathlib import Path

random.seed(7)
W, H = 1440, 760
OUT = Path(__file__).resolve().parents[2] / "src/partials/hero-art.svg"


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


# ---------------- Cordillera (malla de nodos, azul) ----------------
# Perfil de cumbres: suma de "picos" gaussianos, con el más alto hacia la derecha.
peaks = [(120, 40, 90), (360, 70, 120), (600, 110, 110), (820, 230, 140), (1010, 150, 120), (1220, 260, 130), (1420, 170, 100)]


def ridge_y(x):
    base = 470
    h = 0
    for px, ph, pw in peaks:
        h = max(h, ph * math.exp(-((x - px) ** 2) / (2 * pw**2)) + 40)
    return base - h * 1.15


cols = 27
rows = [ridge_y]
ridge = []
grid = []
for r in range(4):
    row = []
    for c in range(cols):
        x = c * W / (cols - 1)
        if r == 0:
            y = ridge_y(x) + random.uniform(-10, 10)
            x += random.uniform(-12, 12) if 0 < c < cols - 1 else 0
        else:
            top = ridge_y(x)
            y = top + (500 - top) * (r / 3.2) + random.uniform(-14, 14)
            x += random.uniform(-22, 22) if 0 < c < cols - 1 else 0
        row.append((x, y))
    grid.append(row)

edges = set()
for r in range(len(grid)):
    for c in range(cols):
        if c + 1 < cols:
            edges.add(((r, c), (r, c + 1)))
        if r + 1 < len(grid):
            edges.add(((r, c), (r + 1, c)))
            # diagonal alterna para formar triángulos
            if c + 1 < cols:
                edges.add(((r, c), (r + 1, c + 1)) if (c + r) % 2 == 0 else ((r, c + 1), (r + 1, c)))

mesh_lines = []
for (a, b) in sorted(edges):
    (x1, y1), (x2, y2) = grid[a[0]][a[1]], grid[b[0]][b[1]]
    if a[0] == 0 and b[0] == 0:
        continue  # la cresta se dibuja aparte, como un solo trazo
    depth = max(a[0], b[0])
    mesh_lines.append(f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}" class="m{depth}"/>')

ridge_d = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in grid[0])
mesh_nodes = []
for r, row in enumerate(grid[:3]):
    for c, (x, y) in enumerate(row):
        if r == 0 or random.random() < 0.45:
            cls = "n tw" if random.random() < 0.35 else "n"
            mesh_nodes.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{2.6 if r == 0 else 1.8}" class="{cls} t{random.randrange(6)}"/>')

# ---------------- Ciudad (edificios como redes, ocre) ----------------
buildings = []
x = -10
idx = 0
while x < W:
    w = random.choice([46, 54, 62, 70, 84, 96])
    # más altos hacia el centro-derecha, como un distrito financiero
    centre = 1 - abs((x + w / 2) - 900) / 900
    h = random.uniform(70, 150) + centre * random.uniform(60, 190)
    buildings.append((x, w, h, idx))
    x += w + random.choice([6, 10, 14])
    idx += 1

ground = H - 20
city = []
windows = []
roof_nodes = []
antenna_nodes = []
for (bx, bw, bh, i) in buildings:
    top = ground - bh
    city.append(
        f'<path class="b s{i % 8}" pathLength="1" d="M{f(bx)} {ground}V{f(top)}H{f(bx + bw)}V{ground}"/>'
    )
    # pisos
    floors = int(bh // 26)
    for k in range(1, floors):
        fy = top + k * 26
        if random.random() < 0.55:
            city.append(f'<line class="fl" x1="{f(bx + 6)}" y1="{f(fy)}" x2="{f(bx + bw - 6)}" y2="{f(fy)}"/>')
    # ventanas (puntos de luz)
    for k in range(floors):
        for wx in range(int(bx + 10), int(bx + bw - 6), 14):
            if random.random() < 0.16:
                cls = "w tw" if random.random() < 0.5 else "w"
                windows.append(
                    f'<rect class="{cls} t{random.randrange(6)}" x="{wx}" y="{f(top + 9 + k * 26)}" width="5" height="7"/>'
                )
    rx = bx + bw / 2
    roof_nodes.append((rx, top))
    if bh > 200 and random.random() < 0.8:
        city.append(f'<line class="ant" x1="{f(rx)}" y1="{f(top)}" x2="{f(rx)}" y2="{f(top - 34)}"/>')
        antenna_nodes.append((rx, top - 34))

# Torre alta (punto focal) sin copiar un edificio real
tx, tw_, th = 980, 58, 360
tt = ground - th
city.append(
    f'<path class="b tower s7" pathLength="1" d="M{tx} {ground}V{tt + 30}L{tx + tw_ / 2} {tt}L{tx + tw_} {tt + 30}V{ground}"/>'
)
for k in range(1, 12):
    city.append(f'<line class="fl" x1="{tx + 6}" y1="{tt + 30 + k * 28}" x2="{tx + tw_ - 6}" y2="{tt + 30 + k * 28}"/>')
city.append(f'<line class="ant" x1="{tx + tw_ / 2}" y1="{tt}" x2="{tx + tw_ / 2}" y2="{tt - 44}"/>')
antenna_nodes.append((tx + tw_ / 2, tt - 44))

# Enlaces de datos entre azoteas (arcos) con paquetes en movimiento
hubs = sorted(antenna_nodes + random.sample(roof_nodes, 6), key=lambda p: p[0])
links = []
packets = []
for j in range(len(hubs) - 1):
    (x1, y1), (x2, y2) = hubs[j], hubs[j + 1]
    cx = (x1 + x2) / 2
    cy = min(y1, y2) - 50 - abs(x2 - x1) * 0.18
    d = f"M{f(x1)} {f(y1)}Q{f(cx)} {f(cy)} {f(x2)} {f(y2)}"
    links.append(f'<path class="lk s{j % 8}" pathLength="1" d="{d}"/>')
    if j % 2 == 0:
        dur = 3.2 + random.uniform(0, 2.5)
        packets.append(
            f'<circle class="pk" r="3"><animateMotion dur="{dur:.1f}s" repeatCount="indefinite" path="{d}"/></circle>'
        )
# Enlaces verticales: la ciudad se conecta con la cordillera
uplinks = []
for (ax, ay) in antenna_nodes[:5]:
    # nodo de malla más cercano en la fila 2
    mx, my = min(grid[2], key=lambda p: abs(p[0] - ax))
    d = f"M{f(ax)} {f(ay)}L{f(mx)} {f(my)}"
    uplinks.append(f'<path class="up" pathLength="1" d="{d}"/>')
    packets.append(
        f'<circle class="pk pk--up" r="2.4"><animateMotion dur="{random.uniform(2.6, 4.2):.1f}s" begin="{random.uniform(0, 2):.1f}s" repeatCount="indefinite" path="{d}"/></circle>'
    )
hub_nodes = "".join(f'<circle class="hub" cx="{f(x)}" cy="{f(y)}" r="3.6"/>' for x, y in hubs)

svg = f"""<svg class="hero-art" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
<defs>
<linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1524" stop-opacity="0"/><stop offset="1" stop-color="#0e1524" stop-opacity=".9"/></linearGradient>
</defs>
<g class="mesh">{"".join(mesh_lines)}</g>
<path class="ridge" pathLength="1" d="{ridge_d}"/>
<g class="mesh-nodes">{"".join(mesh_nodes)}</g>
<rect x="0" y="420" width="{W}" height="{H - 420}" fill="url(#hero-fade)"/>
<g class="uplinks">{"".join(uplinks)}</g>
<g class="city">{"".join(city)}</g>
<g class="windows">{"".join(windows)}</g>
<g class="links">{"".join(links)}</g>
<g class="hubs">{hub_nodes}</g>
<g class="packets">{"".join(packets)}</g>
<line class="ground" x1="0" y1="{ground}" x2="{W}" y2="{ground}"/>
</svg>
"""
OUT.write_text(svg, encoding="utf-8")
print(f"hero-art.svg: {len(svg) / 1024:.1f} KB, {svg.count('<') - svg.count('</')} elementos")
