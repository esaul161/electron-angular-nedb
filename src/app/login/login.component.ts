import { Component, OnInit } from '@angular/core';
import * as Datastore from 'nedb';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioTemplate = { usuario: 'Pedro', password: 'password' };
  UsuarioForm:  FormGroup;
   db = new Datastore({ filename: './Usuarios.db', autoload: true });
   hide = true;

  constructor(private fb: FormBuilder,  private router: Router, private route: ActivatedRoute) {
   // this.usuario.nombre = 'Pedro';
   // this.usuario.password = 'Prueba';
   /* this.db.insert(this.usuario, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    console.log(err);
    console.log(newDoc);
  }); */
  this.UsuarioForm = this.fb.group({
    usuario: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  }

  ngOnInit() {
  }

  login() {
    let flag = false;
  console.log(this.UsuarioForm.value);
  this.db.find(this.UsuarioForm.value, function (err, docs) {
    // docs contains Omicron Persei 8, whose humans have more than 5 genders (7).
    console.log(err);
    console.log(docs);
    if (docs.length) {
     flag = true;
    } else {
      flag = false;
      // tslint:disable-next-line:no-unused-expressio
    }
  });
  setTimeout(() => {
    if (flag) {
      this.router.navigate(['./inicio'], { relativeTo: this.route });
    }}, 1000);
  }

}

interface UsuarioTemplate {
  usuario: string;
  password: string;
}
