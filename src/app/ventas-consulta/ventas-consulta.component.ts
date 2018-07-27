import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as Datastore from 'nedb';
import { process, State } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-ventas-consulta',
  templateUrl: './ventas-consulta.component.html',
  styleUrls: ['./ventas-consulta.component.scss']
})
export class VentasConsultaComponent implements OnInit {
  db = new Datastore({ filename: './Ventas.db', autoload: true });
  public gridData;
  datos;
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

  getData(fechainicio, fechafin) {
    const fechai = Number(moment(fechainicio).valueOf());
    const fechaf = Number(moment(fechafin).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').valueOf());
    console.log(fechai, ' ', fechaf);
    let data = [];
   // console.log(moment(fechanum).format('DD/MM/YYYY'));
    console.log('di click', fechainicio, ' ', fechafin);
    this.db.find({$and: [{ Fecha : { $gte: fechai }}, { Fecha : { $lte: fechaf }} ]}, function (err, docs) {
      // docs contains Earth and Jupiter
      console.log(docs);
      if (docs.length) {
        for (let i = 0 ; i < docs.length ; i ++) {
          docs[i].Fecha = moment(docs[i].Fecha).format('DD/MM/YYYY');
        }
        data = docs;
      }
    });
    setTimeout(() => {
      this.gridData = data;
      this.datos = data;
    }, 1000);
  }
}
