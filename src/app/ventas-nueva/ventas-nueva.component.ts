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
  ELEMENT_DATA: Element[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  displayedColumns = ['Id', 'Descripcion', 'Cantidad', 'PrecioVenta', 'Total', 'Acciones'];
  db = new Datastore({ filename: './Ventas.db', autoload: true });
  dbProd = new Datastore({ filename: './Productos.db', autoload: true });
  existeId = true;
  existen = false;
  flagboton = true;
  texto;
  totart;
  totpag;
  existencias;
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
      Fecha: new FormControl({value: '', disabled: true}, []),
      TotVta: new FormControl({value: '', disabled: true}, []),
      TotArt: new FormControl({value: '', disabled: true}, [])
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
        this.existencias = producto[0].Existencias;
        console.log(this.existencias);
        this.ProductoForm.get('Descripcion').setValue(producto[0].Descripcion);
        this.ProductoForm.get('PrecioVenta').setValue(producto[0].PrecioVenta);
      }
    }, 500);
  }

  addElement() {
    this.ProductoForm.get('Total').setValue(this.ProductoForm.get('PrecioVenta').value * this.ProductoForm.get('Cantidad').value);
    this.ELEMENT_DATA.push(this.ProductoForm.value);
    this.ProductoForm.reset();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.calculaTotales();
  }

  onDelete($valor) {
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i]['Id'] === $valor) {
        this.ELEMENT_DATA.splice(i, 1);
          break;
      }
  }
  this.calculaTotales();
  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  cambioCantidad($event) {
    setTimeout(() => {
      this.ELEMENT_DATA = this.dataSource.data;
      this.calculaTotales();
  }, 500);
  }

  calculaTotales() {
    let sumart = 0;
    let sumtot = 0;
    this.ELEMENT_DATA.forEach(function(obj) {
      console.log('entre al ciclo');
      sumart += Number(obj['Cantidad']);
      obj['Total'] = Number(obj['Cantidad']) * Number(obj['PrecioVenta']);
      sumtot += Number(obj['Total']);
    });
    this.totart = sumart;
    this.totpag = sumtot;
    this.VentaForm.get('TotArt').setValue(this.totart);
    this.VentaForm.get('TotVta').setValue(this.totpag);
  }

  cambioProductos($event) {
    console.log($event);
    if ($event > this.existencias || $event === null) {
      this.existen = true;
      this.flagboton = true;
      this.texto = 'No existen productos suficientes.';
    } else if ($event === 0) {
      this.texto = 'La cantidad debe ser mayor a 0.';
    } else {
      this.existen = false;
      this.flagboton = false;
    }
    console.log($event);
  }
}


interface Product {
   Id: number;
   Descripcion: string;
   Cantidad: number;
   PrecioVenta: number;
}
