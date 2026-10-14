import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="section page-top">
      <div class="container">
        <p class="eyebrow">HABLEMOS</p>
        <h1 class="page-title">Contáctanos</h1>
        <p class="page-subtitle">
          Formulario reactivo de Angular con validadores y mensajes de retroalimentación.
        </p>

        <div class="contact-grid">
          <form class="card form-card" [formGroup]="form" (ngSubmit)="enviar()" novalidate>
            <div class="form-grid">
              <div>
                <label for="nombre">Nombre completo *</label>
                <input id="nombre" formControlName="nombre">
                @if (invalido('nombre')) {
                  <small class="field-error">Escribe al menos 3 caracteres.</small>
                }
              </div>

              <div>
                <label for="correo">Correo electrónico *</label>
                <input id="correo" type="email" formControlName="correo">
                @if (invalido('correo')) {
                  <small class="field-error">Ingresa un correo válido.</small>
                }
              </div>

              <div>
                <label for="asunto">Asunto *</label>
                <input id="asunto" formControlName="asunto">
                @if (invalido('asunto')) {
                  <small class="field-error">Escribe un asunto de al menos 4 caracteres.</small>
                }
              </div>

              <div>
                <label for="categoria">Categoría</label>
                <select id="categoria" formControlName="categoria">
                  <option>Consulta general</option>
                  <option>Sugerencia</option>
                  <option>Noticia</option>
                  <option>Soporte</option>
                </select>
              </div>

              <div class="full">
                <label for="mensaje">Mensaje *</label>
                <textarea id="mensaje" rows="7" formControlName="mensaje"></textarea>
                @if (invalido('mensaje')) {
                  <small class="field-error">Escribe al menos 10 caracteres.</small>
                }
              </div>
            </div>

            <button class="btn btn-primary" type="submit">Enviar mensaje</button>

            @if (estado) {
              <div class="form-message" [class.success]="estado === 'ok'" [class.error]="estado === 'error'">
                {{ mensajeEstado }}
              </div>
            }
          </form>

          <aside class="card contact-info">
            <h2>Evidencia de Angular</h2>
            <p>
              Esta pantalla utiliza <strong>ReactiveFormsModule</strong>,
              <strong>FormBuilder</strong> y <strong>Validators</strong>.
            </p>
            <p><strong>Correo</strong><br>contacto@puntoactual.co</p>
            <p><strong>Ubicación</strong><br>Colombia</p>
          </aside>
        </div>
      </div>
    </section>
  `
})
export class ContactoComponent {
  estado: 'ok' | 'error' | '' = '';
  mensajeEstado = '';

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', [Validators.required, Validators.minLength(4)]],
    categoria: ['Consulta general'],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly servicio: NoticiasService
  ) {}

  invalido(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.estado = 'error';
      this.mensajeEstado = 'Revisa los campos señalados antes de enviar.';
      return;
    }

    this.servicio.guardarMensaje(this.form.getRawValue());
    this.estado = 'ok';
    this.mensajeEstado = 'Mensaje registrado correctamente en el almacenamiento local.';
    this.form.reset({
      nombre: '',
      correo: '',
      asunto: '',
      categoria: 'Consulta general',
      mensaje: ''
    });
  }
}
