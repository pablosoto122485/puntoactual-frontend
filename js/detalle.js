document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('#detailContainer');
  const id = Number(new URLSearchParams(location.search).get('id') || 1);
  try {
    const news = await getAllNews();
    const item = news.find(n => Number(n.id) === id);
    if (!item) throw new Error('La noticia solicitada no existe.');
    const related = news.filter(n => n.id !== item.id && n.categoria === item.categoria).slice(0,2);
    container.innerHTML = `
      <div class="breadcrumbs"><a href="noticias.html">Noticias</a> / ${escapeHtml(item.categoria)}</div>
      <img class="detail-cover" src="${escapeHtml(item.imagen)}" alt="Ilustración de ${escapeHtml(item.categoria)}">
      <span class="chip">${escapeHtml(item.categoria)}</span>
      <h1>${escapeHtml(item.titulo)}</h1>
      <div class="meta">${formatDate(item.fecha)} · ${escapeHtml(item.lectura || '4 min')}</div>
      <p class="detail-lead">${escapeHtml(item.resumen)}</p>
      <div class="detail-actions">
        <button id="detailFavorite" class="btn btn-primary">${isFavorite(id)?'♥ Quitar de favoritos':'♡ Agregar a favoritos'}</button>
        <button id="shareBtn" class="btn btn-secondary">Compartir</button>
        <a class="btn btn-secondary" href="noticias.html">← Volver</a>
      </div>
      <div class="article-body"><p>${escapeHtml(item.contenido)}</p></div>
      ${related.length ? `<section class="related"><h2>Noticias relacionadas</h2><div class="cards-grid">${related.map(newsCard).join('')}</div></section>`:''}
    `;
    bindFavoriteButtons(container);
    document.querySelector('#detailFavorite').addEventListener('click', e => {
      const active = toggleFavorite(id);
      e.currentTarget.textContent = active ? '♥ Quitar de favoritos' : '♡ Agregar a favoritos';
    });
    document.querySelector('#shareBtn').addEventListener('click', async () => {
      const shareData = {title:item.titulo, text:item.resumen, url:location.href};
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(location.href);
        document.querySelector('#shareBtn').textContent='Enlace copiado';
      }
    });
  } catch(error) {
    container.innerHTML = `<div class="empty-state"><h1>${escapeHtml(error.message)}</h1><a class="btn btn-primary" href="noticias.html">Ir a noticias</a></div>`;
  }
});