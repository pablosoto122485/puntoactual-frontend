import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';
import { NewsCardComponent } from '../../shared/news-card/news-card.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, NewsCardComponent],
  template: `
    <section class="section page-top">
      <article class="container detail">
        @if (noticia) {
          <div class="breadcrumbs">
            <a routerLink="/noticias">Noticias</a> / {{ noticia.categoria }}
          </div>

          <img class="detail-cover" [src]="noticia.imagen" [alt]="'Ilustración de ' + noticia.categoria">
          <span class="chip">{{ noticia.categoria }}</span>
          <h1>{{ noticia.titulo }}</h1>
          <div class="meta">{{ noticia.fecha }} · {{ noticia.lectura }}</div>
          <p class="detail-lead">{{ noticia.resumen }}</p>

          <div class="detail-actions">
            <button type="button" class="btn btn-primary" (click)="favorito()">
              {{ servicio.esFavorita(noticia.id) ? '♥ Quitar de favoritos' : '♡ Agregar a favoritos' }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="compartir()">
              {{ mensajeCompartir || 'Compartir' }}
            </button>
            <a class="btn btn-secondary" routerLink="/noticias">← Volver</a>
          </div>

          <div class="article-body">
            <p>{{ noticia.contenido }}</p>
          </div>

          @if (relacionadas.length) {
            <section class="related">
              <h2>Noticias relacionadas</h2>
              <div class="cards-grid">
                @for (item of relacionadas; track item.id) {
                  <app-news-card [noticia]="item"></app-news-card>
                }
              </div>
            </section>
          }
        } @else {
          <div class="empty-state">
            <h1>Noticia no encontrada</h1>
            <a class="btn btn-primary" routerLink="/noticias">Ir a noticias</a>
          </div>
        }
      </article>
    </section>
  `
})
export class DetalleComponent implements OnInit {
  noticia?: Noticia;
  relacionadas: Noticia[] = [];
  mensajeCompartir = '';

  constructor(
    public readonly servicio: NoticiasService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicio.cargar().subscribe(data => {
      this.noticia = data.find(item => item.id === id);
      this.relacionadas = this.noticia
        ? data.filter(item =>
            item.id !== this.noticia?.id &&
            item.categoria === this.noticia?.categoria
          ).slice(0, 2)
        : [];
    });
  }

  favorito(): void {
    if (this.noticia) {
      this.servicio.alternarFavorito(this.noticia.id);
    }
  }

  async compartir(): Promise<void> {
    if (!this.noticia) return;

    const texto = `${this.noticia.titulo} - PuntoActual`;
    try {
      if (navigator.share) {
        await navigator.share({ title: this.noticia.titulo, text: texto, url: location.href });
        this.mensajeCompartir = 'Compartido';
      } else {
        await navigator.clipboard.writeText(location.href);
        this.mensajeCompartir = 'Enlace copiado';
      }
    } catch {
      this.mensajeCompartir = 'Acción cancelada';
    }
  }
}
