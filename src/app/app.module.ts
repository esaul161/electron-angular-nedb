import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
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
import { ConsultaProductosComponent } from './consulta-productos/consulta-productos.component';
import { MenuComponent } from './menu/menu.component';
@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      InicioComponent,
      AltaProductosComponent,
      ConsultaProductosComponent,
      MenuComponent
   ],
   imports: [
      BrowserModule,
      MatToolbarModule,
      MatTableModule,
      MatTabsModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      GridModule,
      BrowserAnimationsModule,
      MatRippleModule,
      MatInputModule,
      FormsModule,
      MatNativeDateModule,
      MatMenuModule,
      MatDatepickerModule,
      ReactiveFormsModule,
      RouterModule.forRoot(AppRoutes, {useHash: false})
   ],
   providers: [
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
