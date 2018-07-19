import { Component, OnInit } from '@angular/core';
import * as Datastore from 'nedb';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioTemplate = { usuario: 'usuario', password: 'password' };
  UsuarioForm:  FormGroup;
  constructor(private fb: FormBuilder, /* private router: Router, private route: ActivatedRoute */) {
   const db = new Datastore({ filename: './Usuarios.db', autoload: true });
  // this.usuario.nombre = 'Prueba';
  // this.usuario.password = 'Prueba';
   db.insert(this.usuario, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    console.log(err);
    console.log(newDoc);
  });
  this.UsuarioForm = this.fb.group({
    usuario: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  }

  ngOnInit() {
  }

}

interface UsuarioTemplate {
  usuario: string;
  password: string;
}
