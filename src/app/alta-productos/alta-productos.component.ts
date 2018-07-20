import { Component, OnInit } from '@angular/core';
import * as Datastore from 'nedb';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrls: ['./alta-productos.component.css']
})
export class AltaProductosComponent implements OnInit {
  ProductoForm:  FormGroup;
   db = new Datastore({ filename: './Productos.db', autoload: true });
   producto: ProductoTemplate;
  constructor(private fb: FormBuilder,  private router: Router, private route: ActivatedRoute) {
    this.ProductoForm = this.fb.group({
      Id: new FormControl(null, [Validators.required]),
      Descripcion: new FormControl(null, [Validators.required]),
      Existencias: new FormControl(null, [Validators.required]),
      PrecioCompra: new FormControl(null, [Validators.required]),
      PrecioVenta: new FormControl(null, [Validators.required]),
      Marca: new FormControl(null, []),
      Proveedor: new FormControl(null, []),
      Fecha: new FormControl(null, []),
    });
  }

  ngOnInit() {
  }

  save() {
    console.log(this.ProductoForm.value);
  }
}

interface ProductoTemplate {
  Id: number;
  Descripcion: string;
  Existencias: number;
  PrecioCompra: number;
  PrecioVenta: number;
  Marca: string;
  Proveedor: string;
  Fecha: Date;
}
