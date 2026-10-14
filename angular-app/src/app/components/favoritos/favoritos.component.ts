import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';
import { NewsCardComponent } from '../../shared/news-card/news-card.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, NewsCardComponent],
  template: `
    <section class="section page-top">
      <div class="container">
        <p class="eyebrow">TU SELECCIÓN</p>
        <h1 class="page-title">Mis favoritos</h1>
        <p class="page-subtitle">
          Angular consulta los identificadores persistidos en localStorage y actualiza esta vista.
        </p>

        @if (favoritas.length) {
          <div class="cards-grid">
            @for (noticia of favoritas; track noticia.id) {
              <app-news-card
                [noticia]="noticia"
                (favoriteChanged)="actualizar()">
              </app-news-card>
            }
          </div>
        } @else {
          <div class="empty-state">
            <div class="empty-icon">♡</div>
            <h2>¿Aún no tienes favoritos?</h2>
            <p>Explora noticias y guarda las que no quieras perder.</p>
            <a class="btn btn-primary" routerLink="/noticias">Ver noticias</a>
          </div>
        }
      </div>
    </section>
  `
})
export class FavoritosComponent implements OnInit {
  favoritas: Noticia[] = [];

  constructor(private readonly servicio: NoticiasService) {}

  ngOnInit(): void {
    this.servicio.cargar().subscribe(() => this.actualizar());
  }

  actualizar(): void {
    this.favoritas = this.servicio.obtenerFavoritas();
  }
}
