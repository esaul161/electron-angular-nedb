import { Component, OnInit } from '@angular/core';
import * as Datastore from 'nedb';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrls: ['./alta-productos.component.scss']
})
export class AltaProductosComponent implements OnInit {
  ProductoForm:  FormGroup;
   db = new Datastore({ filename: './Productos.db', autoload: true });
   producto: ProductoTemplate;
   existeId = false;
  constructor(private fb: FormBuilder,  private router: Router, private route: ActivatedRoute) {
    this.ProductoForm = this.fb.group({
      Id: new FormControl(null, [Validators.required]),
      Descripcion: new FormControl(null, [Validators.required]),
      Existencias: new FormControl(null, [Validators.required]),
      PrecioCompra: new FormControl(null, [Validators.required]),
      PrecioVenta: new FormControl(null, [Validators.required]),
      Marca: new FormControl(null, []),
      Proveedor: new FormControl(null, []),
      Fecha: new FormControl({value: moment().format('DD/MM/YYYY')}, []),
    });
  }

  ngOnInit() {
  }

  save() {
    console.log(this.ProductoForm.value);
    this.ProductoForm.get('Fecha').setValue(moment(this.ProductoForm.get('Fecha').value).format('DD/MM/YYYY'));
    this.db.insert(this.ProductoForm.value, function (err, newDoc) {   // Callback is optional
      // newDoc is the newly inserted document, including its _id
      // newDoc has no key called notToBeSaved since its value was undefined
      console.log(err);
      console.log(newDoc);
    });
    this.ProductoForm.reset();
  }

  verificaId() {
    let flag = false;
    this.db.find({ Id: this.ProductoForm.get('Id').value }, function (err, docs) {
      // docs is [{ planet: 'Mars', system: 'solar' }]
      console.log(err);
      console.log(docs);
      if (docs.length) {
        flag = true;
      } else {
        flag = false;
      }
    });
    setTimeout(() => {
      this.existeId = flag;
    }, 700);
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
