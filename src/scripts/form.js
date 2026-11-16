// Formulario de contacto: validación accesible y envío a Formspree con fetch.
// Sin JavaScript, el formulario usa la validación nativa y se envía de forma tradicional.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(field) {
  const value = field.type === 'checkbox' ? field.checked : field.value.trim();
  if (field.type === 'checkbox') return value;
  if (field.required && !value) return false;
  if (field.type === 'email' && value && !EMAIL.test(value)) return false;
  if (field.minLength > 0 && value.length < field.minLength) return false;
  return true;
}

function setError(field, message) {
  const error = document.getElementById(`${field.id}-err`);
  if (message) {
    field.setAttribute('aria-invalid', 'true');
    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
  } else {
    field.removeAttribute('aria-invalid');
    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
  }
}

export function initContactForm() {
  const form = document.getElementById('form-contacto');
  if (!form) return;

  const status = form.querySelector('.form__status');
  const summary = form.querySelector('.form__errors');
  const submit = form.querySelector('[type="submit"]');
  const fields = [...form.querySelectorAll('[data-error]')];
  const configured = form.dataset.configured === 'true';

  // Preseleccionar el servicio si viene en la URL (?servicio=… o ?service=…).
  const params = new URLSearchParams(window.location.search);
  const preset = params.get('servicio') || params.get('service');
  const select = form.querySelector('select[name="servicio"]');
  if (preset && select?.querySelector(`option[value="${CSS.escape(preset)}"]`)) select.value = preset;

  // Revalidar un campo con error cuando la persona lo corrige.
  fields.forEach((field) => {
    const event = field.type === 'checkbox' ? 'change' : 'input';
    field.addEventListener(event, () => {
      if (field.getAttribute('aria-invalid') === 'true' && validateField(field)) setError(field, '');
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    status.removeAttribute('data-state');

    // Validación con resumen de errores enlazado a cada campo.
    const invalid = fields.filter((field) => !validateField(field));
    fields.forEach((field) => setError(field, invalid.includes(field) ? field.dataset.error : ''));
    if (invalid.length) {
      const list = summary.querySelector('ul');
      summary.querySelector('.form__errors-title').textContent = form.dataset.msgSummary;
      list.replaceChildren(
        ...invalid.map((field) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${field.id}`;
          a.textContent = field.dataset.error;
          a.addEventListener('click', (e) => {
            e.preventDefault();
            field.focus();
          });
          li.append(a);
          return li;
        }),
      );
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;

    if (!configured) return;

    // Honeypot: si un bot lo completó, se simula éxito sin enviar.
    if (form.querySelector('[name="_gotcha"]').value) {
      status.dataset.state = 'success';
      status.textContent = form.dataset.msgSuccess;
      form.reset();
      return;
    }

    submit.disabled = true;
    const label = submit.textContent;
    submit.textContent = form.dataset.msgSending;
    status.textContent = form.dataset.msgSending;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      status.dataset.state = 'success';
      status.textContent = form.dataset.msgSuccess;
      form.reset();
    } catch {
      status.dataset.state = 'error';
      status.textContent = form.dataset.msgError;
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}
