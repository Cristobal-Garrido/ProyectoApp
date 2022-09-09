import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-recover',
  templateUrl: './login-recover.page.html',
  styleUrls: ['./login-recover.page.scss'],
})
export class LoginRecoverPage implements OnInit {

  login = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.email]),
  })

  errors = [
    {type: 'required', message: '¿Olvidas algo? ¡Usuario vacio!'},
    {type: 'email', message: 'Correo Invalido'},
  ]

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

  enviarEnlace() {
    this.presentAlert('Recuperacion', 'Se ha enviado el enlace Correctamente', 'OK')
    this.router.navigate(['../login'])
    /* this.presentToast("El enlace ha sido enviado") */
  }
}

