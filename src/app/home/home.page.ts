import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  user: any;
  mensaje = '';
  data:any={
    user:"",
    password:"",
  }


  constructor(private activeroute: ActivatedRoute, private router: Router, public alertController: AlertController) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user)
      }else{this.router.navigate(['/login'])}
    });
  }
  async cerrarSesion(){
    const alert = await this.alertController.create({
      header: '¿Está seguro de Cerrar la Sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.mensaje = 'Se canceló la operación';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.mensaje = 'Sesión Cerrada';
            this.router.navigate(['/login'])
          },
        },
      ],
    });
  }
}
