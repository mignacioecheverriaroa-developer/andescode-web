"""Mapa esquemático de Chile como red de conectividad: Santiago enlazado con ciudades de norte a sur.

No es un mapa cartográfico: las posiciones salen de latitud/longitud aproximadas, escaladas.
Salida: src/partials/chile-map.svg
"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / "src/partials/chile-map.svg"
W, H = 340, 640

cities = [
    ("Arica", -18.48, -70.31, True),
    ("Iquique", -20.21, -70.15, False),
    ("Antofagasta", -23.65, -70.40, True),
    ("Copiapó", -27.37, -70.33, False),
    ("La Serena", -29.90, -71.25, True),
    ("Valparaíso", -33.05, -71.62, False),
    ("Santiago", -33.45, -70.66, True),
    ("Talca", -35.43, -71.65, False),
    ("Concepción", -36.83, -73.05, True),
    ("Temuco", -38.74, -72.60, False),
    ("Puerto Montt", -41.47, -72.94, True),
    ("Coyhaique", -45.57, -72.07, False),
    ("Punta Arenas", -53.16, -70.91, True),
]


def pos(lat, lon):
    y = 24 + (abs(lat) - 18) * 16.4
    x = 150 - (abs(lon) - 70.3) * 34
    return round(x, 1), round(y, 1)


pts = {name: pos(lat, lon) for name, lat, lon, _ in cities}
sx, sy = pts["Santiago"]

# Cordillera esquemática (al oriente): línea quebrada paralela a las ciudades
ridge = []
for i, (name, lat, lon, _) in enumerate(cities):
    x, y = pts[name]
    ridge.append((292 + (14 if i % 2 else -6) - max(0, (y - 420) * 0.12), y))
ridge_d = "M" + " L".join(f"{x} {y}" for x, y in ridge)

links = []
packets = []
for i, (name, lat, lon, label) in enumerate(cities):
    if name == "Santiago":
        continue
    x, y = pts[name]
    cx = min(x, sx) - 40 - abs(y - sy) * 0.08
    cy = (y + sy) / 2
    d = f"M{sx} {sy}Q{round(cx, 1)} {round(cy, 1)} {x} {y}"
    links.append(f'<path class="mp-link" d="{d}"/>')
    if label:
        dur = 2.4 + abs(y - sy) / 160
        packets.append(f'<circle class="mp-pk" r="2.6"><animateMotion dur="{dur:.1f}s" repeatCount="indefinite" path="{d}"/></circle>')

nodes = []
labels = []
for name, lat, lon, label in cities:
    x, y = pts[name]
    if name == "Santiago":
        nodes.append(f'<circle class="mp-ring" cx="{x}" cy="{y}" r="14"/><circle class="mp-hub" cx="{x}" cy="{y}" r="6.5"/>')
        labels.append(f'<text class="mp-label mp-label--hub" x="{x + 16}" y="{y + 5}">{name}</text>')
    else:
        nodes.append(f'<circle class="mp-node" cx="{x}" cy="{y}" r="{4 if label else 3}"/>')
        if label:
            labels.append(f'<text class="mp-label" x="{x + 10}" y="{y + 4}">{name}</text>')

svg = (
    f'<svg class="chile-map" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mapa-titulo">'
    f'<title id="mapa-titulo">{{{{ h.location.mapLabel }}}}</title>'
    f'<path class="mp-ridge" d="{ridge_d}"/>'
    f'<g class="mp-links">{"".join(links)}</g>'
    f'<g class="mp-packets">{"".join(packets)}</g>'
    f'<g>{"".join(nodes)}</g>'
    f'<g>{"".join(labels)}</g>'
    "</svg>\n"
)
OUT.write_text(svg, encoding="utf-8")
print(f"chile-map.svg: {len(svg)} bytes")
