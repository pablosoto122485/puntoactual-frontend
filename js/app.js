// Utilidades generales compartidas por todas las páginas.
const STORAGE = {
  favorites: 'puntoactual:favorites',
  customNews: 'puntoactual:customNews',
  messages: 'puntoactual:messages'
};

async function getBaseNews() {
  const response = await fetch('data/noticias.json');
  if (!response.ok) throw new Error('No fue posible cargar las noticias.');
  return response.json();
}

function getCustomNews() {
  return JSON.parse(localStorage.getItem(STORAGE.customNews) || '[]');
}

async function getAllNews() {
  const base = await getBaseNews();
  return [...getCustomNews(), ...base];
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE.favorites) || '[]');
}

function setFavorites(ids) {
  localStorage.setItem(STORAGE.favorites, JSON.stringify(ids));
}

function isFavorite(id) {
  return getFavorites().includes(Number(id));
}

function toggleFavorite(id) {
  id = Number(id);
  const list = getFavorites();
  const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
  setFavorites(next);
  return next.includes(id);
}

function escapeHtml(value='') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function formatDate(iso) {
  return new Intl.DateTimeFormat('es-CO', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(iso+'T12:00:00'));
}

function newsCard(n) {
  const active = isFavorite(n.id);
  return `<article class="news-card">
    <img src="${escapeHtml(n.imagen)}" alt="Ilustración de la categoría ${escapeHtml(n.categoria)}">
    <div class="news-card-body">
      <span class="chip">${escapeHtml(n.categoria)}</span>
      <h3>${escapeHtml(n.titulo)}</h3>
      <p>${escapeHtml(n.resumen)}</p>
      <div class="meta">${formatDate(n.fecha)} · ${escapeHtml(n.lectura || '4 min')}</div>
      <div class="card-actions">
        <button class="favorite-btn ${active ? 'active':''}" data-favorite="${n.id}" aria-label="${active?'Quitar de':'Agregar a'} favoritos">${active?'♥':'♡'}</button>
        <a class="text-link" href="detalle.html?id=${n.id}">Leer más →</a>
      </div>
    </div>
  </article>`;
}

function bindFavoriteButtons(root=document) {
  root.querySelectorAll('[data-favorite]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = toggleFavorite(btn.dataset.favorite);
      btn.classList.toggle('active', active);
      btn.textContent = active ? '♥' : '♡';
      btn.setAttribute('aria-label', `${active?'Quitar de':'Agregar a'} favoritos`);
      document.dispatchEvent(new CustomEvent('favorites:changed'));
    });
  });
}

// Menú adaptable.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
});