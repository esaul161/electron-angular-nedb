import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { NotaVentaComponent } from './../nota-venta/nota-venta.component';

@Component({
  selector: 'app-dialog-cerrarventa',
  templateUrl: './dialog-cerrarventa.component.html',
  styleUrls: ['./dialog-cerrarventa.component.scss']
})
export class DialogCerrarventaComponent implements OnInit {
  PagoForm: FormGroup;
  invalido;
  paperS = ['48mm', '320mm'];
  totalpago;
  cambio;
  disable;
  bandera;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCerrarventaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.totalpago = data.total;
      this.PagoForm = this.fb.group({
        TipoPago: new FormControl({value: 'Efectivo'}, []),
        Pago: new FormControl(),
        Referencia: new FormControl()
      });
      this.bandera = true;
    }

  ngOnInit() {
    this.invalido = false;
     this.PagoForm.get('TipoPago').setValue('Efectivo');
     this.disable = true;
  }

  generaCambio($value) {
    console.log('cambie de valor');
    if ($value > this.totalpago) {
      this.cambio = $value - this.totalpago;
      this.invalido = false;
      this.bandera = false;
    } else if ($value < this.totalpago) {
      this.cambio =  $value - this.totalpago;
      this.invalido = true;
      this.bandera = true;
    } else {
      this.bandera = false;
      this.invalido = false;
      this.cambio = this.totalpago - $value;
    }
  }
    radioChange($event) {
     /*  console.log('cambie', $event.value);
      if ($event === 'Efectivo') {
        // this.PagoForm.get('Referencia').enable();
        this.disable = true;
      } else {
        this.disable = false;
        // this.PagoForm.get('Referencia').enable();
      } */
    }

}
