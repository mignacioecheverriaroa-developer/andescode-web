// Navegación: botón de menú móvil y submenú de servicios como "disclosure" accesible.
export function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu-principal');
  if (toggle && nav) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.toggleAttribute('data-open', open);
    });
  }

  document.querySelectorAll('.site-nav__sub-toggle').forEach((button) => {
    const item = button.closest('.site-nav__item');
    const close = () => button.setAttribute('aria-expanded', 'false');
    button.hidden = false;
    button.addEventListener('click', () => {
      button.setAttribute('aria-expanded', String(button.getAttribute('aria-expanded') !== 'true'));
    });
    // Escape cierra el submenú y devuelve el foco al botón.
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        close();
        button.focus();
      }
    });
    // Cerrar al salir del elemento con el foco o al hacer clic fuera.
    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) close();
    });
    document.addEventListener('click', (event) => {
      if (!item.contains(event.target)) close();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      nav.removeAttribute('data-open');
      toggle.focus();
    }
  });
}
