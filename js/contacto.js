document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contactForm');
  const status = document.querySelector('#formMessage');
  function validate(input) {
    const error = input.parentElement.querySelector('.field-error');
    if (!error) return input.checkValidity();
    let message = '';
    if (input.validity.valueMissing) message = 'Este campo es obligatorio.';
    else if (input.validity.typeMismatch) message = 'Ingresa un correo electrónico válido.';
    else if (input.validity.tooShort) message = `Escribe al menos ${input.minLength} caracteres.`;
    error.textContent = message;
    return !message;
  }
  form.querySelectorAll('input,textarea').forEach(i => i.addEventListener('blur',()=>validate(i)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input,textarea')];
    const valid = fields.every(validate);
    status.className = `form-message ${valid?'success':'error'}`;
    if (!valid) { status.textContent='Revisa los campos señalados antes de enviar.'; return; }
    const saved = JSON.parse(localStorage.getItem(STORAGE.messages) || '[]');
    saved.push({name:form.name.value,email:form.email.value,subject:form.subject.value,category:form.category.value,message:form.message.value,createdAt:new Date().toISOString()});
    localStorage.setItem(STORAGE.messages, JSON.stringify(saved));
    status.textContent='Mensaje enviado correctamente. Gracias por comunicarte con PuntoActual.';
    form.reset();
  });
});