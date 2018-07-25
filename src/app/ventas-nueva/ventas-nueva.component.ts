import { Component, OnInit, Inject } from '@angular/core';
import * as Datastore from 'nedb';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import {MatTableDataSource} from '@angular/material';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-ventas-nueva',
  templateUrl: './ventas-nueva.component.html',
  styleUrls: ['./ventas-nueva.component.scss']
})
export class VentasNuevaComponent implements OnInit {
  VentaForm: FormGroup;
  ProductoForm:  FormGroup;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns = ['Id', 'Descripcion', 'Cantidad', 'PrecioVenta', 'Total'];
  db = new Datastore({ filename: './Ventas.db', autoload: true });
  dbProd = new Datastore({ filename: './Productos.db', autoload: true });
  existeId = true;
  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'Id', operator: 'contains'}]
    }
   };
  constructor(private fb: FormBuilder,  private router: Router, private route: ActivatedRoute) {
    this.VentaForm = this.fb.group({
      Id: new FormControl(null, [Validators.required]),
      Fecha: new FormControl({value: '', disabled: true}, [])
    });
    this.ProductoForm = this.fb.group({
      Id: new FormControl(null, [Validators.required]),
      Cantidad: new FormControl(null, []),
      Descripcion: new FormControl(null, []),
      PrecioVenta: new FormControl(null, []),
      Total: new FormControl(null, [])
    });
  }

  ngOnInit() {
    this.VentaForm.get('Fecha').setValue((new Date()).toISOString());
  }

  verificaId($value) {
    let flag = false;
    console.log('valor ', $value);
    let producto = [];
    this.dbProd.find({ Id: Number($value) }, function (err, docs) {
      // docs is [{ planet: 'Mars', system: 'solar' }]
      console.log(err);
      console.log(docs);
      if (docs.length) {
        flag = true;
        producto = docs;
      } else {
        flag = false;
      }
    });
    setTimeout(() => {
      this.existeId = flag;
      if (flag) {
        this.ProductoForm.get('Descripcion').setValue(producto[0].Descripcion);
        this.ProductoForm.get('PrecioVenta').setValue(producto[0].PrecioVenta);
      }
    }, 500);
  }

  addElement() {
    this.ProductoForm.get('Total').setValue(this.ProductoForm.get('PrecioVenta').value * this.ProductoForm.get('Cantidad').value);
    console.log(this.ProductoForm.value);
    ELEMENT_DATA.push(this.ProductoForm.value);
    this.ProductoForm.reset();
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

}

interface Product {
   Id: number;
   Descripcion: string;
   Cantidad: number;
   PrecioVenta: number;
}

const ELEMENT_DATA: Element[] = [
];
