import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponent implements OnInit {
  texto;
  opcion1;
  opcion2;
  titulo;
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.titulo = data.titulo;
    this.opcion1  = data.opcion1;
    this.opcion2 = data.opcion2;
    this.texto = data.texto;
  }

  ngOnInit() {
  }

}
