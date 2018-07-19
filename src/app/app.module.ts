import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatRippleModule,
  MatInputModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent
   ],
   imports: [
      BrowserModule,
      MatToolbarModule,
      MatTabsModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      BrowserAnimationsModule,
      MatRippleModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule
    ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
