import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { log } from 'util';
import * as Datastore from 'nedb';
import { process, State } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-consulta-productos',
  templateUrl: './consulta-productos.component.html',
  styleUrls: ['./consulta-productos.component.scss']
})
export class ConsultaProductosComponent implements OnInit {
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
  db = new Datastore({ filename: './Productos.db', autoload: true });
  constructor() {
   }

  ngOnInit() {
    let source: any;
    this.db.find({}).sort({ Id: 1 }).exec(function (err, docs) {
        source = docs;
      });
    this.gridData = source;
    setTimeout(() => {
      this.gridData = source;
      this.datos = source;
    }, 1000);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    console.log(state);
    console.log(this.datos);
    this.gridData = process(this.gridData, this.state);
}
}
