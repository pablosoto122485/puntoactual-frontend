import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { Noticia } from '../models/noticia';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly FAVORITOS_KEY = 'puntoactual:favorites';
  private readonly CUSTOM_KEY = 'puntoactual:customNews';
  private readonly MENSAJES_KEY = 'puntoactual:messages';

  readonly noticias = signal<Noticia[]>([]);
  readonly favoritosIds = signal<number[]>(this.leerNumeros(this.FAVORITOS_KEY));

  constructor(private readonly http: HttpClient) {}

  cargar(): Observable<Noticia[]> {
    if (this.noticias().length) {
      return of(this.noticias());
    }

    return this.http.get<Noticia[]>('assets/noticias.json').pipe(
      map(base => [...this.noticiasPersonalizadas(), ...base]),
      tap(data => this.noticias.set(data))
    );
  }

  buscarPorId(id: number): Noticia | undefined {
    return this.noticias().find(n => n.id === id);
  }

  esFavorita(id: number): boolean {
    return this.favoritosIds().includes(id);
  }

  alternarFavorito(id: number): boolean {
    const actual = this.favoritosIds();
    const siguiente = actual.includes(id)
      ? actual.filter(item => item !== id)
      : [...actual, id];

    this.favoritosIds.set(siguiente);
    localStorage.setItem(this.FAVORITOS_KEY, JSON.stringify(siguiente));
    return siguiente.includes(id);
  }

  obtenerFavoritas(): Noticia[] {
    const ids = this.favoritosIds();
    return this.noticias().filter(n => ids.includes(n.id));
  }

  noticiasPersonalizadas(): Noticia[] {
    return this.leerNoticias(this.CUSTOM_KEY);
  }

  agregarNoticia(data: Omit<Noticia, 'id' | 'fecha' | 'lectura' | 'imagen'>): Noticia {
    const nueva: Noticia = {
      ...data,
      id: Date.now(),
      fecha: new Date().toISOString().slice(0, 10),
      lectura: '4 min',
      imagen: 'assets/img/tecnologia.svg'
    };

    const personalizadas = [nueva, ...this.noticiasPersonalizadas()];
    localStorage.setItem(this.CUSTOM_KEY, JSON.stringify(personalizadas));
    this.noticias.set([nueva, ...this.noticias()]);
    return nueva;
  }

  eliminarNoticia(id: number): void {
    const personalizadas = this.noticiasPersonalizadas().filter(n => n.id !== id);
    localStorage.setItem(this.CUSTOM_KEY, JSON.stringify(personalizadas));
    this.noticias.set(this.noticias().filter(n => n.id !== id));

    if (this.esFavorita(id)) {
      this.alternarFavorito(id);
    }
  }

  guardarMensaje(mensaje: object): void {
    const actuales = this.leerObjetos(this.MENSAJES_KEY);
    localStorage.setItem(
      this.MENSAJES_KEY,
      JSON.stringify([{ ...mensaje, fecha: new Date().toISOString() }, ...actuales])
    );
  }

  private leerNumeros(clave: string): number[] {
    try {
      return JSON.parse(localStorage.getItem(clave) ?? '[]') as number[];
    } catch {
      return [];
    }
  }

  private leerNoticias(clave: string): Noticia[] {
    try {
      return JSON.parse(localStorage.getItem(clave) ?? '[]') as Noticia[];
    } catch {
      return [];
    }
  }

  private leerObjetos(clave: string): Record<string, unknown>[] {
    try {
      return JSON.parse(localStorage.getItem(clave) ?? '[]') as Record<string, unknown>[];
    } catch {
      return [];
    }
  }
}
