import { Component, OnInit } from '@angular/core';
import * as Datastore from 'nedb';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from './../dialog-component/dialog-component.component';
import * as moment from 'moment';

@Component({
  selector: 'app-baja-productos',
  templateUrl: './baja-productos.component.html',
  styleUrls: ['./baja-productos.component.scss']
})
export class BajaProductosComponent implements OnInit {
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
    console.log($value);
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
      } else {
        this.eliminar = true;
        this.ProductoForm.reset();
      }    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open( DialogComponent, {
      width: '450px',
      data: {titulo: 'Eliminar Producto', texto: '¿Seguro que desea eliminarlo?', opcion1: 'Sí', opcion2: 'No'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.db.remove({ Id: this.idEliminar }, {}, function (err, numRemoved) {
          // numRemoved = 1
          console.log(err, numRemoved);
        });
        this.ProductoForm.reset();
      }
    });
  }
}
