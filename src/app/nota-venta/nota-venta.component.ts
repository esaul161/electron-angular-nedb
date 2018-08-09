import { Component, OnInit, Input } from '@angular/core';
import * as Datastore from 'nedb';
import { process, State } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import * as moment from 'moment';

@Component({
  selector: 'app-nota-venta',
  templateUrl: './nota-venta.component.html',
  styleUrls: ['./nota-venta.component.scss']
})
export class NotaVentaComponent implements OnInit {
   @Input() data;
  dateTime = new Date();
  fecha;
  db = new Datastore({ filename: './Configuracion.db', autoload: true });
  datosEmpresa;
  gridData;
  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'Id', operator: 'contains'}]
    }
   };
  constructor() {
    this.fecha = moment(this.dateTime).format('DD/MM/YYYY HH:mm:ss');
   }

  ngOnInit() {
    console.log('datos ', this.data);
    let datos;
    this.db.find({}, function(err, Doc) {
      console.log(Doc);
      datos = Doc[0];
    });
    setTimeout(() => {
           this.datosEmpresa = datos;
      this.gridData = this.data.Productos;
      console.log('Productos ', this.gridData);
  }, 700);
  }

public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    console.log(state);
    // console.log('Productos ', this.datosEmpresa.Productos);
    this.gridData = process(this.gridData, this.state);
}

}
