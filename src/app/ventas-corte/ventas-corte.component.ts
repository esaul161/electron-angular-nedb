import { Validators } from '@angular/forms';
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
  selector: 'app-ventas-corte',
  templateUrl: './ventas-corte.component.html',
  styleUrls: ['./ventas-corte.component.scss']
})
export class VentasCorteComponent implements OnInit {

  db = new Datastore({ filename: './Ventas.db', autoload: true });
  @ViewChild('TotalVenta') TotalVenta: ElementRef;
  @ViewChild('TotalEfectivo') TotalEfectivo: ElementRef;
  @ViewChild('TotalTarjeta') TotalTarjeta: ElementRef;
  @ViewChild('TotalArticulos') TotalArticulos: ElementRef;
  @ViewChild('fechainicio') FInicio: ElementRef;
  @ViewChild('fechafin') FFin: ElementRef;
  public gridData;
  datos;
  public total;
  totalVta = 0;
  totalArt = 0;
  vtaEfectivo = 0;
  vtaTarjeta = 0;
  Narchivo = 'Corte'+moment().format('MM/DD/YYYY');
  public state: State = {
    skip: 0,
    take: 10,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'Id', operator: 'contains'}]
    }
   };
  constructor() { }

  ngOnInit() {
    this.FFin.nativeElement.value = moment().format('MM/DD/YYYY');
    this.FInicio.nativeElement.value = moment().format('MM/DD/YYYY');
  }

  getData(fechainicio, fechafin) {
    const fechai = Number(moment(fechainicio).valueOf());
    const fechaf = Number(moment(fechafin).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').valueOf());
    console.log(fechai, ' ', fechaf);
    let data = [];
    let tot = 0;
    let tota = 0;
    let totE = 0;
    let totT = 0;
   // console.log(moment(fechanum).format('DD/MM/YYYY'));
    console.log('di click', fechainicio, ' ', fechafin);
    this.db.find({$and: [{ Fecha : { $gte: fechai }}, { Fecha : { $lte: fechaf }} ]}, function (err, docs) {
      // docs contains Earth and Jupiter
      console.log(docs);
      if (docs.length) {
        for (let i = 0 ; i < docs.length ; i ++) {
          tot = docs[i].TotVta + tot;
          tota = docs[i].TotArt + tota;
          if (docs[i].Pago.TipoPago === 'Efectivo') {
            totE = docs[i].TotVta + totE;
          } else {
            totT = docs[i].TotVta + totT;
          }
          docs[i].Fecha = moment(docs[i].Fecha).format('DD/MM/YYYY');
        }
        data = docs;
      }
    });
    setTimeout(() => {
      this.gridData = data;
      this.datos = data;
      this.totalVta = tot;
      this.totalArt = tota;
      this.TotalEfectivo.nativeElement.value = totE;
      this.TotalTarjeta.nativeElement.value = totT;
      this.TotalArticulos.nativeElement.value = tota;
      this.TotalVenta.nativeElement.value = tot;
      this.vtaEfectivo = totE;
      this.vtaTarjeta = totT;
    }, 1000);
  }

}
