document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('#featuredNews');
  try {
    const news = await getAllNews();
    grid.innerHTML = news.slice(0, 3).map(newsCard).join('');
    bindFavoriteButtons(grid);
  } catch (error) {
    grid.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
  document.querySelector('#homeSearch').addEventListener('submit', e => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q').trim();
    location.href = `noticias.html?q=${encodeURIComponent(q)}`;
  });
});