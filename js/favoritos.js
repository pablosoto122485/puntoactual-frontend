document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('#favoritesGrid');
  const empty = document.querySelector('#favoritesEmpty');
  let news = [];
  async function render() {
    const ids = getFavorites();
    const result = news.filter(n => ids.includes(Number(n.id)));
    grid.innerHTML = result.map(newsCard).join('');
    empty.classList.toggle('hidden', result.length > 0);
    bindFavoriteButtons(grid);
  }
  try { news = await getAllNews(); await render(); }
  catch(error){ grid.innerHTML=`<p>${escapeHtml(error.message)}</p>`; }
  document.addEventListener('favorites:changed', render);
});