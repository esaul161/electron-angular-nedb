import { Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import * as moment from 'moment';
import * as Datastore from 'nedb';
import { process, GroupDescriptor, State, aggregateBy } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent,
  PagerComponent,
  PageChangeEvent
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-ventas-consulta',
  templateUrl: './ventas-consulta.component.html',
  styleUrls: ['./ventas-consulta.component.scss']
})
export class VentasConsultaComponent implements OnInit, AfterViewInit {
  db = new Datastore({ filename: './Ventas.db', autoload: true });
  @ViewChild('TotalVenta') TotalVenta: ElementRef;
  @ViewChild('TotalEfectivo') TotalEfectivo: ElementRef;
  @ViewChild('TotalTarjeta') TotalTarjeta: ElementRef;
  @ViewChild('TotalArticulos') TotalArticulos: ElementRef;
  public gridData;
  datos;
  public total;
  totalVta = 0;
  totalArt = 0;
  vtaEfectivo = 0;
  vtaTarjeta = 0;
  public state: State = {
    skip: 0,
    take: 10,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'Id', operator: 'contains'}]
    }
   };
   pageSize = 10;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  getData(fechainicio, fechafin) {
    const fechai = Number(moment(fechainicio).valueOf());
    const fechaf = Number(moment(fechafin).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').valueOf());
    console.log(fechai, ' ', fechaf);
    let data: any;
    let tot = 0;
    let tota = 0;
    let totE = 0;
    let totT = 0;
   // let source: any;
   // console.log(moment(fechanum).format('DD/MM/YYYY'));
    // console.log('di click', fechainicio, ' ', fechafin);
    this.db.find({$and: [{ Fecha : { $gte: fechai }}, { Fecha : { $lte: fechaf }} ]}).sort({ Fecha: 1 }).exec( function (err, docs) {
      // docs contains Earth and Jupiter
      data = docs;
      // console.log(docs);
      if (data.length) {
        for (let i = 0 ; i < data.length ; i ++) {
          tot = data[i].TotVta + tot;
          tota = data[i].TotArt + tota;
          if (data[i].Pago.TipoPago === 'Efectivo') {
            totE = data[i].TotVta + totE;
          } else {
            totT = data[i].TotVta + totT;
          }
          data[i].Fecha = moment(data[i].Fecha).format('DD/MM/YYYY');
        }

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

public pageChange(event: PageChangeEvent): void {
        this.state.skip = event.skip;
        this.loadItems();
    }

    private loadItems(): void {
        this.gridData = {
            data: this.datos.slice(this.state.skip, this.state.skip + this.pageSize),
            total: this.datos.length
        };
    }
}
