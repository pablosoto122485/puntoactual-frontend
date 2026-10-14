import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { GestionComponent } from './components/gestion/gestion.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'gestion', component: GestionComponent },
  { path: '**', redirectTo: '' }
];
