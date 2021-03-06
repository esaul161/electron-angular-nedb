import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AltaProductosComponent } from './alta-productos/alta-productos.component';
import { ConsultaProductosComponent } from './consulta-productos/consulta-productos.component';
import { BajaProductosComponent } from './baja-productos/baja-productos.component';
import { CambioProductosComponent } from './cambio-productos/cambio-productos.component';
import { VentasNuevaComponent } from './ventas-nueva/ventas-nueva.component';
import { VentasConsultaComponent } from './ventas-consulta/ventas-consulta.component';
import { VentasCorteComponent } from './ventas-corte/ventas-corte.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { VentasConsultaTicketComponent } from './ventas-consulta-ticket/ventas-consulta-ticket.component';

export const AppRoutes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: LoginComponent },
  { path: 'altaproductos', component: AltaProductosComponent },
  { path: 'consultaproductos', component: ConsultaProductosComponent },
  { path: 'bajaproductos', component: BajaProductosComponent },
  { path: 'cambioproductos', component: CambioProductosComponent },
  { path: 'ventanueva', component: VentasNuevaComponent },
  { path: 'consultaventa', component: VentasConsultaComponent },
  { path: 'corteventa', component: VentasCorteComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'consultaticket', component: VentasConsultaTicketComponent }

];
