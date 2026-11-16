// Punto de entrada. Cada módulo es una mejora progresiva: el sitio funciona sin JavaScript.
import { initNav } from './nav.js';
import { initTheme } from './theme.js';
import { initContactForm } from './form.js';
import { initBackToTop } from './back-to-top.js';

initNav();
initTheme();
initContactForm();
initBackToTop();
