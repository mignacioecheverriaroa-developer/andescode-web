# Dominio propio: andescode.smartgridgroup.cl

El dominio `smartgridgroup.cl` usa los servidores de nombres de **Cloudflare** (`marissa.ns.cloudflare.com`, `uriah.ns.cloudflare.com`), así que el registro se crea en el panel de Cloudflare, no en NIC Chile.

## 1. Registro DNS (en Cloudflare → smartgridgroup.cl → DNS → Records)

| Tipo    | Nombre      | Destino                                   | Proxy                    | TTL  |
| ------- | ----------- | ----------------------------------------- | ------------------------ | ---- |
| `CNAME` | `andescode` | `mignacioecheverriaroa-netizen.github.io` | **Solo DNS (nube gris)** | Auto |

Importante: deja el proxy **desactivado** (nube gris). Con la nube naranja, GitHub no puede verificar el dominio ni emitir el certificado HTTPS.

## 2. Activar el dominio en GitHub

Cuando el registro ya resuelva (puede tardar de minutos a unas horas):

1. Repositorio → **Settings → Secrets and variables → Actions → Variables** → crear `CUSTOM_DOMAIN` = `andescode.smartgridgroup.cl`.
2. **Settings → Pages → Custom domain** → `andescode.smartgridgroup.cl` → **Save**. Esperar el check verde de DNS.
3. Marcar **Enforce HTTPS** (se habilita cuando GitHub emite el certificado, normalmente en menos de una hora).
4. **Actions → Deploy → Run workflow** para recompilar con la nueva URL (canonical, sitemap, Open Graph).

## 3. Recomendado: verificar el dominio en GitHub

Evita que otra cuenta pueda reclamar el subdominio: perfil → **Settings → Pages → Add a domain** → `smartgridgroup.cl`, y crear en Cloudflare el registro `TXT` que GitHub indique (`_github-pages-challenge-mignacioecheverriaroa-netizen`).

## Comprobación

```bash
dig +short andescode.smartgridgroup.cl CNAME   # → mignacioecheverriaroa-netizen.github.io.
curl -I https://andescode.smartgridgroup.cl    # → HTTP/2 200
```
