# PuntoActual - Implementación Angular

Esta carpeta contiene la evidencia de **implementación básica en un framework** solicitada para la Entrega Final del módulo Desarrollo de Front-end.

## Evidencias del framework

La aplicación usa Angular y TypeScript con:

- Componentes standalone.
- Enrutamiento con Angular Router.
- Interpolación: `{{ valor }}`.
- Property binding: `[src]`, `[routerLink]`, `[class.active]`.
- Event binding: `(click)`, `(ngSubmit)`.
- Two-way binding: `[(ngModel)]`.
- `@Input()` y `@Output()` en el componente reutilizable de tarjetas.
- Formularios reactivos con `ReactiveFormsModule`, `FormBuilder` y `Validators`.
- Servicio inyectable con `@Injectable`.
- `HttpClient` para cargar el catálogo JSON.
- Persistencia de favoritos, mensajes y mini CRUD con `localStorage`.
- Navegación segura en GitHub Pages mediante rutas hash.

## Componentes

```text
src/app/
├── app.component.ts
├── app.routes.ts
├── components/
│   ├── home/
│   ├── noticias/
│   ├── detalle/
│   ├── favoritos/
│   ├── contacto/
│   └── gestion/
├── shared/
│   └── news-card/
├── services/
│   └── noticias.service.ts
└── models/
    └── noticia.ts
```

## Ejecución local

```bash
cd angular-app
npm install
npm start
```

Abrir: `http://localhost:4200/`

## Compilación de producción

```bash
npm run build -- --base-href /puntoactual-frontend/
```

El workflow de GitHub Actions ubicado en `.github/workflows/deploy-angular-pages.yml` compila y despliega esta versión en GitHub Pages.
