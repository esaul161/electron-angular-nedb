import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import * as Datastore from 'nedb';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:4200/configuracion';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})

export class ConfiguracionComponent implements OnInit {
  ConfiguracionForm:  FormGroup;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public uploader: FileUploader = new FileUploader({url: URL});
  db = new Datastore({ filename: './Configuracion.db', autoload: true });
  esNuevo = false;
  uploadSaveUrl = './../imagenes'; // should represent an actual API endpoint
  uploadRemoveUrl = './../imagenes';
  constructor(private fb: FormBuilder) {
    this.ConfiguracionForm = this.fb.group({
      Id: new FormControl({value: 1, disabled: false}, []),
      Nombre: new FormControl(),
      Domicilio: new FormControl(),
      Mensaje: new FormControl()
    });
  }

  ngOnInit() {
    let datos;
    this.db.find({Id: 1}, function (err, docs) {
      console.log(docs);
      datos = docs[0];
    });
    setTimeout(() => {
      if (datos) {
        this.ConfiguracionForm.patchValue(datos);
        this.esNuevo = true;
      } else {
        this.esNuevo = false;
      }
  }, 700);
  }

  save() {
    // console.log('Guardar');
    // console.log(this.ConfiguracionForm.value)
    if (this.esNuevo) {
      this.db.update({ Id: 1 }, { $set: this.ConfiguracionForm.value }, { multi: true },
     function (err, newDoc) {   // Callback is optional
      // newDoc is the newly inserted document, including its _id
      // newDoc has no key called notToBeSaved since its value was undefined
      console.log(err);
      console.log(newDoc);
    });
    } else {
       this.db.insert(this.ConfiguracionForm.value, function (err, newDoc) {   // Callback is optional
      // newDoc is the newly inserted document, including its _id
      // newDoc has no key called notToBeSaved since its value was undefined
     // console.log(err);
     // console.log(newDoc);
    });
    }
    this.ConfiguracionForm.reset();
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
