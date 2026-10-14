import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" routerLink="/" aria-label="PuntoActual - Inicio">
          Punto<span>Actual</span>
        </a>

        <nav class="main-nav" aria-label="Navegación principal">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="active">Noticias</a>
          <a routerLink="/favoritos" routerLinkActive="active">Favoritos</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
          <a routerLink="/gestion" routerLinkActive="active">Gestión</a>
        </nav>

        <div class="framework-badge" title="Implementación básica en Angular">Angular</div>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <div class="brand brand-light">Punto<span>Actual</span></div>
          <p>Noticias que informan e inspiran.</p>
        </div>
        <div>
          <strong>Tecnologías</strong>
          <p>Angular · TypeScript · HTML · CSS · Web Storage</p>
        </div>
        <div>
          <strong>Proyecto académico</strong>
          <p>Entrega Final · Desarrollo Front-end · 2026</p>
        </div>
      </div>
      <div class="container copyright">© 2026 PuntoActual.</div>
    </footer>
  `
})
export class AppComponent {}
