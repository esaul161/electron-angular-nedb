import { Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import * as moment from 'moment';
import * as Datastore from 'nedb';
import { process, GroupDescriptor, State, aggregateBy } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent,
  PagerComponent
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-ventas-consulta-ticket',
  templateUrl: './ventas-consulta-ticket.component.html',
  styleUrls: ['./ventas-consulta-ticket.component.scss']
})
export class VentasConsultaTicketComponent implements OnInit {
  @ViewChild('ticket') ticket: ElementRef;
  db = new Datastore({ filename: './Ventas.db', autoload: true });
  existeId = false;
  public gridData;
  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'Id', operator: 'contains'}]
    }
   };
  constructor() { }

  ngOnInit() {
  }

  getData(nticket) {
    let datos = [];
    let bandera = false;
    this.db.find({Id: Number(nticket)}, function(err, Doc) {
      console.log(Doc);
      if (Doc.length) {
        datos = Doc;
      } else {
        bandera = true;
      }
    });
    setTimeout(() => {
      console.log(datos);
      this.gridData = datos;
      this.existeId = bandera;
    } , 700);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    // console.log(state);
   // console.log(this.datos);
    this.gridData = process(this.gridData, this.state);
}
}
