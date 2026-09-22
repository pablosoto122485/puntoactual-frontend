document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('#newsGrid');
  const search = document.querySelector('#searchInput');
  const count = document.querySelector('#resultCount');
  const sort = document.querySelector('#sortSelect');
  const from = document.querySelector('#dateFrom');
  const to = document.querySelector('#dateTo');
  const empty = document.querySelector('#emptyState');
  let news = [];
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';

  function render() {
    const cat = document.querySelector('input[name="cat"]:checked').value;
    const term = search.value.trim().toLowerCase();
    let result = news.filter(n => {
      const matchesText = !term || `${n.titulo} ${n.resumen} ${n.categoria}`.toLowerCase().includes(term);
      const matchesCat = !cat || n.categoria === cat;
      const matchesFrom = !from.value || n.fecha >= from.value;
      const matchesTo = !to.value || n.fecha <= to.value;
      return matchesText && matchesCat && matchesFrom && matchesTo;
    });
    if (sort.value === 'new') result.sort((a,b)=>b.fecha.localeCompare(a.fecha));
    if (sort.value === 'old') result.sort((a,b)=>a.fecha.localeCompare(b.fecha));
    if (sort.value === 'az') result.sort((a,b)=>a.titulo.localeCompare(b.titulo,'es'));
    count.textContent = `${result.length} resultado${result.length===1?'':'s'}`;
    grid.innerHTML = result.map(newsCard).join('');
    empty.classList.toggle('hidden', result.length > 0);
    bindFavoriteButtons(grid);
  }

  try { news = await getAllNews(); render(); }
  catch (error) { grid.innerHTML = `<p>${escapeHtml(error.message)}</p>`; }

  [search,sort,from,to].forEach(el => el.addEventListener('input', render));
  document.querySelectorAll('input[name="cat"]').forEach(el => el.addEventListener('change', render));
  document.querySelector('#clearFilters').addEventListener('click', () => {
    search.value=''; from.value=''; to.value=''; sort.value='new';
    document.querySelector('input[name="cat"][value=""]').checked=true; render();
  });
});