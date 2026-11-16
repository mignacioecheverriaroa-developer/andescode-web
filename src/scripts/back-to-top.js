// Botón flotante "volver arriba". Sin JavaScript queda el enlace del pie de página.
export function initBackToTop() {
  const button = document.querySelector('.back-to-top');
  if (!button) return;
  button.hidden = false;

  const update = () => button.toggleAttribute('data-visible', window.scrollY > window.innerHeight);
  window.addEventListener('scroll', update, { passive: true });
  update();

  button.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Mover el foco al inicio para que el teclado y los lectores de pantalla también "suban".
    document.querySelector('.site-header__brand')?.focus({ preventScroll: true });
  });
}
