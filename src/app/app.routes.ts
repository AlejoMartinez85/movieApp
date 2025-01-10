import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DetailComponent } from './features/detail/detail.component';

export const routes: Routes = [
  { path: 'movies', component: HomeComponent }, // Ruta predeterminada
  { path: 'movies/:id', component: DetailComponent }, // Ruta con parámetro
  { path: '**', redirectTo: 'movies', pathMatch: 'full' }, // Redirección de rutas no encontradas
];
