import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ApiAlumnosService } from '../servicios/api-alumnos.service';
import { NgModule } from '@angular/core';
//FIREBASE
/* import * as firebase from 'firebase'; */


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

  getData:[]=[];


  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    public _servicio: ApiAlumnosService
    ) {
    /* this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user)
      }else{this.router.navigate(['/home'])}
    });  */

    this.router.navigate(['home/uno']);

  }

  segmentChanged($event){
    let direccion=$event.detail.value;
    this.router.navigate(['home/'+direccion]);
  }



  /* async cerrarSesion(){
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
  } */
}
