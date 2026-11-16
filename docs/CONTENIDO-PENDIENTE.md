# Contenido pendiente

Contenido real que AndesCode debe aportar. Mientras no exista, el sitio muestra un marcador visible ("Contenido pendiente") y **no** inventa nada.

| Pendiente                                                       | Dónde se muestra                                   | Cómo actualizarlo                                                                               |
| --------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Logo oficial de SmartGrid Group (SVG o PNG)                     | Pie de página de todas las páginas                 | Guardar en `src/assets/brand/smartgridgroup.svg` y definir `parent.logo` en `src/_data/site.js` |
| URL pública de SmartGrid Group                                  | Pie de página (enlace del logo)                    | `parent.url` en `src/_data/site.js` (hoy smartgridgroup.cl no tiene sitio publicado)            |
| ID de Formspree                                                 | Formulario de contacto (hoy desactivado con aviso) | Variable del repositorio `FORMSPREE_ID`                                                         |
| Equipo: nombres, roles y fotos reales                           | Nosotros                                           | `src/pages/nosotros.njk`                                                                        |
| Tiempo de respuesta comprometido                                | Contacto                                           | `i18n.js` → `contact.responsePending`                                                           |
| Casos de estudio reales por servicio                            | Detalle de cada servicio                           | Nueva sección en `servicio-detalle.njk`                                                         |
| Testimonios reales (con autorización escrita)                   | No publicado                                       | Solo si existen y son verificables                                                              |
| Fotografías reales (equipo, oficina, proyectos)                 | Nosotros, servicios                                | Reemplazar la ilustración con `{% picture %}`                                                   |
| Razón social, RUT y dirección comercial (si se desean publicar) | Privacidad y JSON-LD                               | `site.js` y `i18n.js` → `privacy`                                                               |
| Revisión legal de la política de privacidad                     | Privacidad                                         | Texto base redactado conforme a la Ley 19.628; validar con asesoría legal                       |
| Redes sociales oficiales                                        | Pie de página y JSON-LD (`sameAs`)                 | Agregar cuando existan                                                                          |
