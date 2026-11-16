// Animaciones de entrada, línea de proceso, sombra del encabezado y sección activa.
// Todo es mejora progresiva: sin JavaScript el contenido ya es visible.
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
  const targets = document.querySelectorAll('[data-reveal], [data-process]');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => io.observe(el));
}

function initHeaderShadow() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.toggleAttribute('data-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Marca en la navegación de secciones la que está en pantalla.
function initSectionSpy() {
  const links = [...document.querySelectorAll('.section-nav a[href^="#"]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const link = byId.get(entry.target.id);
        if (link) {
          link.setAttribute('aria-current', 'true');
          link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  });
}

// Las animaciones SMIL (paquetes de datos) no obedecen CSS: se pausan con JavaScript
// si la persona pidió reducir el movimiento, y también cuando el SVG no está en pantalla.
function initSvgAnimations() {
  const svgs = document.querySelectorAll('.hero-art, .chile-map');
  svgs.forEach((svg) => {
    if (typeof svg.pauseAnimations !== 'function') return;
    if (reduceMotion()) {
      svg.pauseAnimations();
      return;
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) svg.unpauseAnimations();
        else svg.pauseAnimations();
      }).observe(svg);
    }
  });
}

export function initMotion() {
  initReveal();
  initHeaderShadow();
  initSectionSpy();
  initSvgAnimations();
}
