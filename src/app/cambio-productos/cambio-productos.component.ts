import { Component, OnInit } from '@angular/core';
import * as Datastore from 'nedb';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from './../dialog-component/dialog-component.component';
import * as moment from 'moment';

@Component({
  selector: 'app-cambio-productos',
  templateUrl: './cambio-productos.component.html',
  styleUrls: ['./cambio-productos.component.scss']
})
export class CambioProductosComponent implements OnInit {
  ProductoForm:  FormGroup;
   db = new Datastore({ filename: './Productos.db', autoload: true });
   existeId = true;
   idEliminar;
   eliminar = true;
  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.ProductoForm = this.fb.group({
      Id: new FormControl(null, [Validators.required]),
      Descripcion: new FormControl(null, [Validators.required]),
      Existencias: new FormControl(null, [Validators.required]),
      PrecioCompra: new FormControl(null, [Validators.required]),
      PrecioVenta: new FormControl(null, [Validators.required]),
      Marca: new FormControl(null, []),
      Proveedor: new FormControl(null, []),
      Fecha: new FormControl({value: null}, []),
    });
    this.ProductoForm.disable();
   }

  ngOnInit() {
  }

  verificaId($value) {
    let flag = false;
    this.idEliminar = Number($value);
    let datos;
    this.db.find({ Id: this.idEliminar }, function (err, docs) {
      // docs is [{ planet: 'Mars', system: 'solar' }]
      console.log(err);
      console.log(docs);
      if (docs.length) {
        flag = true;
        datos = docs;
      } else {
        flag = false;
      }
    });
    setTimeout(() => {
      this.existeId = flag;
      if (flag) {
        this.eliminar = false;
        this.ProductoForm.patchValue(datos[0]);
        this.ProductoForm.enable();
        this.ProductoForm.get('Id').disable();
      } else {
        this.eliminar = true;
        this.ProductoForm.reset();
        this.ProductoForm.disable();
      }
    }, 700);
  }

  save() {
    console.log(this.ProductoForm.value);
    this.ProductoForm.get('Fecha').setValue(moment(this.ProductoForm.get('Fecha').value).format('DD/MM/YYYY'));
    this.db.update({ Id: this.idEliminar }, { $set: this.ProductoForm.value }, { multi: true },
     function (err, newDoc) {   // Callback is optional
      // newDoc is the newly inserted document, including its _id
      // newDoc has no key called notToBeSaved since its value was undefined
      console.log(err);
      console.log(newDoc);
    });
    this.ProductoForm.reset();
  }
}
