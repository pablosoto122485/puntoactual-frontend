document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('#newsForm');
  const list = document.querySelector('#manageList');
  const status = document.querySelector('#manageMessage');

  function render() {
    const custom = getCustomNews();
    if (!custom.length) { list.innerHTML='<p class="page-subtitle">Aún no has creado noticias locales.</p>'; return; }
    list.innerHTML = custom.map(n => `<div class="manage-item"><div><h3>${escapeHtml(n.titulo)}</h3><p>${escapeHtml(n.categoria)} · ${formatDate(n.fecha)}</p></div><button class="danger-btn" data-delete="${n.id}">Eliminar</button></div>`).join('');
    list.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => {
      if (!confirm('¿Deseas eliminar esta noticia? Esta acción no se puede deshacer.')) return;
      const id = Number(btn.dataset.delete);
      const next = getCustomNews().filter(n => Number(n.id) !== id);
      localStorage.setItem(STORAGE.customNews, JSON.stringify(next));
      setFavorites(getFavorites().filter(x => x !== id));
      render();
    }));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const custom = getCustomNews();
    const id = Date.now();
    const item = {
      id,
      categoria: form.querySelector('#cat').value,
      titulo: form.querySelector('#title').value.trim(),
      resumen: form.querySelector('#summary').value.trim(),
      contenido: form.querySelector('#content').value.trim(),
      fecha: new Date().toISOString().slice(0,10),
      lectura: '4 min',
      imagen: 'assets/img/tecnologia.svg'
    };
    localStorage.setItem(STORAGE.customNews, JSON.stringify([item, ...custom]));
    status.className='form-message success';
    status.textContent='Noticia publicada de forma local.';
    form.reset();
    render();
  });
  render();
});