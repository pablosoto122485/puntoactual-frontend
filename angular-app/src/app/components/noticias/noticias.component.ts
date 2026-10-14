import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';
import { NewsCardComponent } from '../../shared/news-card/news-card.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [FormsModule, NewsCardComponent],
  template: `
    <section class="section page-top">
      <div class="container">
        <p class="eyebrow">EXPLORA · DESCUBRE</p>
        <h1 class="page-title">Todas las noticias</h1>
        <p class="page-subtitle">
          Los filtros se actualizan dinámicamente mediante data binding de Angular.
        </p>

        <div class="catalog-layout">
          <aside class="filters card">
            <h2>Filtrar noticias</h2>

            <label for="searchInput">Buscar</label>
            <input
              id="searchInput"
              type="search"
              [(ngModel)]="termino"
              placeholder="Buscar noticias...">

            <label for="categorySelect">Categoría</label>
            <select id="categorySelect" [(ngModel)]="categoria">
              <option value="">Todas</option>
              @for (cat of categorias; track cat) {
                <option [value]="cat">{{ cat }}</option>
              }
            </select>

            <label for="sortSelect">Orden</label>
            <select id="sortSelect" [(ngModel)]="orden">
              <option value="new">Más recientes</option>
              <option value="old">Más antiguas</option>
              <option value="az">Título A-Z</option>
            </select>

            <button type="button" class="btn btn-primary btn-block" (click)="limpiar()">
              Limpiar filtros
            </button>
          </aside>

          <div>
            <div class="catalog-toolbar">
              <strong>{{ filtradas.length }} resultado{{ filtradas.length === 1 ? '' : 's' }}</strong>
              <span class="angular-proof">Angular binding activo</span>
            </div>

            @if (filtradas.length) {
              <div class="cards-grid">
                @for (noticia of filtradas; track noticia.id) {
                  <app-news-card [noticia]="noticia"></app-news-card>
                }
              </div>
            } @else {
              <div class="empty-state">
                <h2>No encontramos resultados</h2>
                <p>Prueba con otro término o limpia los filtros.</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  termino = '';
  categoria = '';
  orden: 'new' | 'old' | 'az' = 'new';
  categorias = ['Tecnología', 'Educación', 'Turismo', 'Comercial', 'Negocios', 'Salud'];

  constructor(
    private readonly servicio: NoticiasService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.termino = this.route.snapshot.queryParamMap.get('q') ?? '';
    this.servicio.cargar().subscribe(data => {
      this.noticias = data;
    });
  }

  get filtradas(): Noticia[] {
    const term = this.termino.trim().toLowerCase();

    const resultado = this.noticias.filter(noticia => {
      const coincideTexto = !term ||
        [noticia.titulo, noticia.resumen, noticia.categoria]
          .join(' ')
          .toLowerCase()
          .includes(term);
      const coincideCategoria = !this.categoria || noticia.categoria === this.categoria;
      return coincideTexto && coincideCategoria;
    });

    return [...resultado].sort((a, b) => {
      if (this.orden === 'old') return a.fecha.localeCompare(b.fecha);
      if (this.orden === 'az') return a.titulo.localeCompare(b.titulo, 'es');
      return b.fecha.localeCompare(a.fecha);
    });
  }

  limpiar(): void {
    this.termino = '';
    this.categoria = '';
    this.orden = 'new';
  }
}
