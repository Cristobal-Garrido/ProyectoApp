import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login-recover',
  templateUrl: './login-recover.page.html',
  styleUrls: ['./login-recover.page.scss'],
})
export class LoginRecoverPage implements OnInit {
  [x: string]: any;

  login = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.email]),
  })

  errors = [
    {type: 'required', message: '¿Olvidas algo? ¡Usuario vacio!'},
    {type: 'email', message: 'Correo Invalido'},
  ]

  fecha = new Date();

  constructor(
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController
     ) { }

  ngOnInit() {
  }

  irLogin() {
    console.log("llamado siguiente")
    this.router.navigate(['../login'])
    }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 5000
    });
    toast.present();
  }

  async presentAlert(head, msg, btn) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: [btn],
    });
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  enviarCorreo(contactForm: NgForm) {
    if (contactForm.valid) {
      const form = contactForm.value;
      const email = form.name + '@duocuc.cl';
      const messages = 'Buenas estimad@, se le envía este correo porque se solicitó un cambio de contraseña en la fecha ' + this.fecha + 
      + 'https://passwordreset.microsoftonline.com/?ru=https%3a%2f%2flogin.microsoftonline.com%2f72fd0b5a-8a6a-4cff-89f6-bde961f7e250%2freprocess%3fctx%3drQQIARAA42KwMsgoKSkottLXT07MLSgtLsssKilNzNFLKc1P1kvO0U8sLcnQLU7MzdEHE8HB_kVCXAI71eew7rr6xHdOsGDV7TnrC1Yx2pFqjH5iTmZisX68oZGpcbzhIUb5RMNEQ8MMw4wMS0sLUwuLdOOUTKMM4ywjQwMDw8wUiwuMjC8YGW8xsQYDDTDaxKxibpSWYpBkmqhrkWiWqGuSnJama2GZZqablJJqaWaYZp5qZGpwgYXnFQuPAbMVBweXAIMEgwLDDxbGRaxAH0w4qZrio-zmP-PCrn3_-5cxnGLVdwoLK7HUtjDJCkssNgzKjMitKnRPNU9O8kgzDUrTN_U1trQsStR2jfBKzbY1tjKcwMZ7io3hAxtjBzvDLHaGXZwUBsEBXoYffJuXz7lxomXrWw8A0&mkt=es-419&hosted=0&device_platform=Windows+10'
      'Si usted no ha solicitado este cambio, por favor ignorar este correo.' +
      'ESTE ES UN CORREO AUTOMATIZADO, POR FAVOR NO RESPONDER';
      const headers = new HttpHeaders({ 'Content Type': 'application/json'});
      
      this.http.post('https://formspree.io/f/xwkzdawy',
      { name: form.name, replyto: this.email, message: this.messages },
      { 'headers':headers}).subscribe(
        response => {
          console.log(email);
          console.log(response);
        }
      )
    }
    this.presentAlert('Recuperacion', 'Se ha enviado el enlace Correctamente', 'OK')
  }

  enviarEnlace() {
    this.router.navigate(['../login'])
    /* this.presentToast("El enlace ha sido enviado") */
  }
}

