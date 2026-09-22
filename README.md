# PuntoActual - Entrega Previa 2

Primera versión funcional de la Plataforma Web de Noticias propuesta en la Entrega Previa 1.

## Tecnologías
- HTML5 semántico
- CSS3 responsive
- JavaScript ES6
- JSON local
- Web Storage API (`localStorage`)

## Funcionalidades
- Home con noticias destacadas y buscador.
- Listado dinámico desde JSON con búsqueda, filtros, fecha y orden.
- Detalle de noticia y noticias relacionadas.
- Gestión de favoritos persistente con `localStorage`.
- Formulario de contacto con validación y confirmación.
- Mini CRUD académico para crear y eliminar noticias locales.
- Diseño responsive y navegación adaptable.

## Estructura
```text
.
├── index.html
├── noticias.html
├── detalle.html
├── favoritos.html
├── contacto.html
├── gestion.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── home.js
│   ├── noticias.js
│   ├── detalle.js
│   ├── favoritos.js
│   ├── contacto.js
│   └── gestion.js
├── data/
│   └── noticias.json
└── assets/img/
```

## Ejecución local
Debido a que el proyecto carga un archivo JSON mediante `fetch`, debe ejecutarse desde un servidor HTTP local.

Con Python:
```bash
python -m http.server 8000
```

Luego abrir:
`http://localhost:8000`

También puede utilizarse Live Server en Visual Studio Code.

## Repositorio
https://github.com/pablosoto122485/puntoactual-frontend
