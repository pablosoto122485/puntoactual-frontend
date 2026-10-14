import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="news-card">
      <img [src]="noticia.imagen" [alt]="'Ilustración de ' + noticia.categoria">

      <div class="news-card-body">
        <span class="chip">{{ noticia.categoria }}</span>
        <h3>{{ noticia.titulo }}</h3>
        <p>{{ noticia.resumen }}</p>
        <div class="meta">{{ noticia.fecha }} · {{ noticia.lectura }}</div>

        <div class="card-actions">
          <button
            type="button"
            class="favorite-btn"
            [class.active]="servicio.esFavorita(noticia.id)"
            (click)="cambiarFavorito()"
            [attr.aria-label]="servicio.esFavorita(noticia.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'">
            {{ servicio.esFavorita(noticia.id) ? '♥' : '♡' }}
          </button>

          <a class="text-link" [routerLink]="['/detalle', noticia.id]">Leer más →</a>
        </div>
      </div>
    </article>
  `
})
export class NewsCardComponent {
  @Input({ required: true }) noticia!: Noticia;
  @Output() favoriteChanged = new EventEmitter<number>();

  constructor(public readonly servicio: NoticiasService) {}

  cambiarFavorito(): void {
    this.servicio.alternarFavorito(this.noticia.id);
    this.favoriteChanged.emit(this.noticia.id);
  }
}
