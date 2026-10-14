import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="section page-top">
      <div class="container">
        <p class="eyebrow">MINI CRUD · ANGULAR</p>
        <h1 class="page-title">Gestión de noticias</h1>
        <p class="page-subtitle">
          Creación y eliminación local de registros mediante un servicio inyectable.
        </p>

        <div class="management-layout">
          <form class="card form-card" [formGroup]="form" (ngSubmit)="crear()">
            <h2>Crear nueva noticia</h2>

            <label for="titulo">Título *</label>
            <input id="titulo" formControlName="titulo">

            <label for="categoriaGestion">Categoría *</label>
            <select id="categoriaGestion" formControlName="categoria">
              <option value="">Selecciona...</option>
              <option>Tecnología</option>
              <option>Educación</option>
              <option>Turismo</option>
              <option>Comercial</option>
              <option>Negocios</option>
              <option>Salud</option>
            </select>

            <label for="resumen">Resumen *</label>
            <textarea id="resumen" rows="3" formControlName="resumen"></textarea>

            <label for="contenido">Contenido *</label>
            <textarea id="contenido" rows="7" formControlName="contenido"></textarea>

            <div class="button-row">
              <button type="button" class="btn btn-secondary" (click)="limpiar()">Cancelar</button>
              <button class="btn btn-primary" type="submit">Publicar noticia</button>
            </div>

            @if (mensaje) {
              <div class="form-message" [class.success]="mensaje.includes('publicada')" [class.error]="mensaje.includes('Completa')">
                {{ mensaje }}
              </div>
            }
          </form>

          <section class="card management-list">
            <h2>Noticias creadas localmente</h2>

            @if (personalizadas.length) {
              @for (noticia of personalizadas; track noticia.id) {
                <div class="manage-item">
                  <div>
                    <h3>{{ noticia.titulo }}</h3>
                    <p>{{ noticia.categoria }} · {{ noticia.fecha }}</p>
                  </div>
                  <button class="danger-btn" type="button" (click)="eliminar(noticia.id)">
                    Eliminar
                  </button>
                </div>
              }
            } @else {
              <p class="page-subtitle">Aún no se han creado noticias desde Angular.</p>
            }
          </section>
        </div>
      </div>
    </section>
  `
})
export class GestionComponent implements OnInit {
  personalizadas: Noticia[] = [];
  mensaje = '';

  readonly form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    categoria: ['', Validators.required],
    resumen: ['', [Validators.required, Validators.minLength(15)]],
    contenido: ['', [Validators.required, Validators.minLength(30)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly servicio: NoticiasService
  ) {}

  ngOnInit(): void {
    this.servicio.cargar().subscribe(() => this.actualizar());
  }

  crear(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensaje = 'Completa correctamente todos los campos obligatorios.';
      return;
    }

    this.servicio.agregarNoticia(this.form.getRawValue());
    this.mensaje = 'Noticia publicada correctamente con Angular.';
    this.limpiar(false);
    this.actualizar();
  }

  eliminar(id: number): void {
    if (!confirm('¿Deseas eliminar esta noticia?')) return;
    this.servicio.eliminarNoticia(id);
    this.actualizar();
  }

  limpiar(borrarMensaje = true): void {
    this.form.reset({ titulo: '', categoria: '', resumen: '', contenido: '' });
    if (borrarMensaje) this.mensaje = '';
  }

  private actualizar(): void {
    this.personalizadas = this.servicio.noticiasPersonalizadas();
  }
}
