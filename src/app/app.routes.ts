import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DetailComponent } from './modules/detail/detail.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'search-movies', component: HomeComponent }, // Ruta predeterminada
  { path: 'detail/:id', component: DetailComponent }, // Ruta con parámetro
  { path: '**', redirectTo: 'search-movies', pathMatch: 'full' }, // Redirección de rutas no encontradas
];
