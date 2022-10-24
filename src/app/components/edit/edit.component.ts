import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Viaje } from 'src/app/models/interfaces';
import { FireBaseBdService } from 'src/app/servicios/fire-base-bd.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../home/home.page.scss'],
})
export class EditComponent implements OnInit {

  viajeCapturado: any = this.fireBase.viajeEdit;
  viajeEnvioBd: Viaje;

  constructor(
    public router: Router,
    public fireBase: FireBaseBdService,
    public alertController: AlertController
    ) { 
      this.viajeCapturado = this.fireBase.viajeEdit;
     
    }

  ngOnInit() {
    this.viajeCapturado = this.fireBase.viajeEdit;
    this.ejecutarMostrarViaje();
    console.log('OnInit funciona');
    this.updateViajes();
  }

  ionDidLoad() {
    console.log('ion did load')
  }

  volver() {
    this.router.navigate(['/home/uno']);
  }

  ejecutarMostrarViaje() {
    this.viajeCapturado = this.fireBase.viajeEdit;
    console.log('viajeEdit: ',this.fireBase.viajeEdit)
    console.log('viajeCapturado: ',this.viajeCapturado)
  }

  updateViajes() {
    const nombreValue = document.querySelector('#nombreUp') as HTMLInputElement;

    let sectorValue = document.querySelector('#sectorUp') as HTMLInputElement;

    const patenteValue = document.querySelector('#patenteUp') as HTMLInputElement;

    const precioValue = document.querySelector('#precioUp') as HTMLInputElement;

    const descripcionValue = document.querySelector('#descripcionUp') as HTMLInputElement;

    const idValue = document.querySelector('#idUp') as HTMLInputElement;

    nombreValue.value = this.viajeCapturado.nombre;
    patenteValue.value = this.viajeCapturado.patente;
    precioValue.value = this.viajeCapturado.precio;
    descripcionValue.value = this.viajeCapturado.descripcion;
    sectorValue.value = this.viajeCapturado.sector;
    idValue.value = this.viajeCapturado.id;
  }

  updateViaje() {
    const nombreValue = document.querySelector('#nombreUp') as HTMLInputElement;
    let sectorValue = document.querySelector('#sectorUp') as HTMLInputElement;
    const patenteValue = document.querySelector('#patenteUp') as HTMLInputElement;
    const precioValue = document.querySelector('#precioUp') as HTMLInputElement;
    const descripcionValue = document.querySelector('#descripcionUp') as HTMLInputElement;
    const idValue = document.querySelector('#idUp') as HTMLInputElement;

    this.viajeEnvioBd = {
      nombre: nombreValue.value,
      precio: parseInt(precioValue.value),
      patente: patenteValue.value,
      sector: sectorValue.value,
      descripcion: descripcionValue.value,
      id: idValue.value
    }
    console.log('Viaje enviado update',this.viajeEnvioBd);
    this.updateViajeBd(this.viajeEnvioBd,this.viajeEnvioBd.id);
    this.presentAlert('Exito', 'Viaje Actualizado.', 'OK')
    this.router.navigate(['/home/uno']);
  }


  updateViajeBd(data: any, id: string) {
    const enlace = 'Viajes';
    this.fireBase.updateDocument(data, enlace, id);
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
}
