import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';
import { NewsCardComponent } from '../../shared/news-card/news-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, NewsCardComponent],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">ANGULAR · TYPESCRIPT · WEB STORAGE</p>
          <h1>Historias que conectan con el mundo</h1>
          <p class="hero-copy">
            Explora noticias, guarda tus favoritas y prueba una implementación funcional
            construida con componentes y binding de Angular.
          </p>

          <form class="hero-search" (ngSubmit)="buscar()">
            <label class="sr-only" for="homeSearch">Buscar noticias</label>
            <input
              id="homeSearch"
              name="busqueda"
              [(ngModel)]="termino"
              placeholder="¿Qué te gustaría leer hoy?"
              required>
            <button class="btn btn-primary" type="submit">Buscar</button>
          </form>
        </div>

        <div class="hero-orb" aria-hidden="true">
          <span>ng</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">SELECCIÓN EDITORIAL</p>
            <h2>Noticias destacadas</h2>
          </div>
          <a class="text-link" routerLink="/noticias">Ver todas →</a>
        </div>

        <div class="cards-grid">
          @for (noticia of destacadas; track noticia.id) {
            <app-news-card [noticia]="noticia"></app-news-card>
          }
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container cta-panel">
        <div>
          <p class="eyebrow">IMPLEMENTACIÓN EN FRAMEWORK</p>
          <h2>Angular integrado al proyecto</h2>
          <p>
            Esta versión utiliza componentes standalone, enrutamiento, interpolación,
            property binding, event binding, formularios y servicios.
          </p>
        </div>
        <a class="btn btn-primary" routerLink="/gestion">Probar gestión</a>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  termino = '';
  destacadas: Noticia[] = [];

  constructor(
    private readonly noticiasService: NoticiasService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.noticiasService.cargar().subscribe(data => {
      this.destacadas = data.slice(0, 3);
    });
  }

  buscar(): void {
    const q = this.termino.trim();
    this.router.navigate(['/noticias'], { queryParams: q ? { q } : {} });
  }
}
