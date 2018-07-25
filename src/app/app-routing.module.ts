import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AltaProductosComponent } from './alta-productos/alta-productos.component';
import { ConsultaProductosComponent } from './consulta-productos/consulta-productos.component';
import { BajaProductosComponent } from './baja-productos/baja-productos.component';
import { CambioProductosComponent } from './cambio-productos/cambio-productos.component';

export const AppRoutes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: LoginComponent },
  { path: 'altaproductos', component: AltaProductosComponent },
  { path: 'consultaproductos', component: ConsultaProductosComponent },
  { path: 'bajaproductos', component: BajaProductosComponent },
  { path: 'cambioproductos', component: CambioProductosComponent },

];
