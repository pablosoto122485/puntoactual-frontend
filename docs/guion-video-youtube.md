# Guion sugerido para video explicativo - PuntoActual

Duración recomendada: 2:30 a 3:00 minutos.

## 0:00 - 0:20 | Presentación
"Mi nombre es Pablo Andrés Soto Berrio. Este es PuntoActual, una plataforma web de noticias desarrollada para el módulo Desarrollo de Front-end. La aplicación está publicada en GitHub Pages y el código fuente se encuentra en GitHub."

Mostrar:
- Repositorio: https://github.com/pablosoto122485/puntoactual-frontend
- Despliegue: https://pablosoto122485.github.io/puntoactual-frontend/

## 0:20 - 1:15 | Funcionalidades
Recorrer:
1. Inicio: noticias destacadas y buscador.
2. Noticias: búsqueda, filtro por categoría y orden.
3. Detalle: información ampliada y favoritos.
4. Favoritos: persistencia con localStorage.
5. Contacto: formulario con validaciones.
6. Gestión: creación y eliminación local de noticias.

## 1:15 - 2:15 | Evidencia de Angular
Abrir el repositorio y mostrar la carpeta `angular-app/src/app`.

Explicar:
"Para corregir la observación relacionada con el framework, integré Angular con componentes standalone y Angular Router."

Mostrar:
- `app.routes.ts`: rutas del aplicativo.
- `news-card.component.ts`: `@Input`, `@Output`, interpolación, property binding y event binding.
- `contacto.component.ts`: formularios reactivos y Validators.
- `noticias.service.ts`: servicio inyectable, HttpClient y localStorage.

## 2:15 - 2:45 | Despliegue
Mostrar la pestaña Actions de GitHub y explicar:
"GitHub Actions instala las dependencias, compila Angular y publica el resultado en GitHub Pages."

Abrir nuevamente la URL desplegada.

## 2:45 - 3:00 | Cierre
"Con esta versión se evidencia el uso de HTML, CSS, TypeScript, Angular, Web Storage, GitHub y GitHub Pages. Gracias."

## Configuración de YouTube
- Título sugerido: **PuntoActual - Entrega Final Front-end | Angular y GitHub Pages**
- Visibilidad: **No listado** o **Público**.
- No usar "Privado", porque el tutor no podrá abrirlo.
- Pegar la URL del video en el PDF final.
