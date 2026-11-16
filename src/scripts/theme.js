// Selector de tema: automático → claro → oscuro. La preferencia se guarda en localStorage
// (con try/catch: puede no estar disponible en modo privado o con almacenamiento bloqueado).
const ORDER = ['auto', 'light', 'dark'];

function read() {
  try {
    const value = localStorage.getItem('theme');
    return ORDER.includes(value) ? value : 'auto';
  } catch {
    return 'auto';
  }
}

function write(value) {
  try {
    if (value === 'auto') localStorage.removeItem('theme');
    else localStorage.setItem('theme', value);
  } catch {
    /* Sin almacenamiento: la preferencia dura solo esta visita. */
  }
}

function apply(value) {
  const root = document.documentElement;
  if (value === 'auto') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', value);
}

export function initTheme() {
  const button = document.querySelector('.theme-toggle');
  if (!button) return;
  const text = button.querySelector('.theme-toggle__text');
  const labels = { auto: button.dataset.auto, light: button.dataset.light, dark: button.dataset.dark };
  let current = read();

  const render = () => {
    text.textContent = `${button.dataset.label}: ${labels[current]}`;
  };

  button.hidden = false;
  render();
  button.addEventListener('click', () => {
    current = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    apply(current);
    write(current);
    render();
  });
}
