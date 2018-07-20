import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AltaProductosComponent } from './alta-productos/alta-productos.component';

export const AppRoutes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: LoginComponent },
  { path: 'alta-productos', component: AltaProductosComponent }
];
