import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { UploadModule } from '@progress/kendo-angular-upload';
import { FileUploadModule } from 'ng2-file-upload';
import {
  MatToolbarModule,
  MatTabsModule,
  MatButtonModule,
  MatCardModule,
  MatRippleModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule
} from '@angular/material';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app-routing.module';
import { AltaProductosComponent } from './alta-productos/alta-productos.component';
import { DialogComponent } from './dialog-component/dialog-component.component';
import { BajaProductosComponent } from './baja-productos/baja-productos.component';
import { ConsultaProductosComponent } from './consulta-productos/consulta-productos.component';
import { CambioProductosComponent } from './cambio-productos/cambio-productos.component';
import { VentasNuevaComponent } from './ventas-nueva/ventas-nueva.component';
import { MenuComponent } from './menu/menu.component';
import { VentasConsultaComponent } from './ventas-consulta/ventas-consulta.component';
import { VentasCorteComponent } from './ventas-corte/ventas-corte.component';
import { DialogCerrarventaComponent } from './dialog-cerrarventa/dialog-cerrarventa.component';
import { NotaVentaComponent } from './nota-venta/nota-venta.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { VentasConsultaTicketComponent } from './ventas-consulta-ticket/ventas-consulta-ticket.component';
@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      InicioComponent,
      AltaProductosComponent,
      ConsultaProductosComponent,
      CambioProductosComponent,
      VentasConsultaComponent,
      MenuComponent,
      BajaProductosComponent,
      DialogComponent,
      VentasNuevaComponent,
      VentasCorteComponent,
      DialogCerrarventaComponent,
      NotaVentaComponent,
      ConfiguracionComponent,
      VentasConsultaTicketComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      UploadModule,
      MatGridListModule,
      FileUploadModule,
      MatRadioModule,
      PDFExportModule,
      MatToolbarModule,
      MatTableModule,
      MatTabsModule,
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      GridModule,
      ExcelModule,
      PDFModule,
      PDFExportModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(AppRoutes,
      {useHash: false}),
      MatRippleModule,
      MatInputModule,
      FormsModule,
      MatNativeDateModule,
      MatMenuModule,
      MatDatepickerModule,
      ReactiveFormsModule
   ],
   providers: [
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [DialogComponent, DialogCerrarventaComponent]
})
export class AppModule { }
