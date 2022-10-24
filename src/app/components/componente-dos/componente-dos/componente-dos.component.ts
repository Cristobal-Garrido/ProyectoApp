import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje } from 'src/app/models/interfaces';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { FireBaseBdService } from 'src/app/servicios/fire-base-bd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-componente-dos',
  templateUrl: './componente-dos.component.html',
  styleUrls: ['../../../home/home.page.scss'],
})
export class ComponenteDosComponent implements OnInit {

  //Atributos por defecto
  newViaje: Viaje = {
    nombre: '',
    precio: 1000,
    patente: '',
    sector: '',
    descripcion: '',
    id: ''
  }

  nowViaje: any = {
    nombre: '',
    precio: null,
    patente: '',
    sector: '',
    descripcion: ''
  }

  public  nombre: '';
  public precio: null;
  public patente: '';
  public sector: '';
  public descripcion: '';

  public fullname: string = '';

  constructor(
    private router: Router,
    public database: FireBaseBdService,
    public alertController: AlertController
    ) { }

  @ViewChild('nombre') referencia : ElementRef;


  ngOnInit() {
  }

  verificar() {
    this.database.verificarbtn();
  }

  save() {

    console.log('viaje vacio: ',this.newViaje)
    const nombreValue = document.querySelector('#nombre') as HTMLInputElement;
    console.log(nombreValue.value)

    let sectorValue = document.querySelector('#sector') as HTMLInputElement;

    const patenteValue = document.querySelector('#patente') as HTMLInputElement;

    const precioValue = document.querySelector('#precio') as HTMLInputElement;

    const descripcionValue = document.querySelector('#descripcion') as HTMLInputElement;

    this.newViaje = {
      nombre: nombreValue.value,
      precio: parseInt(precioValue.value),
      patente: patenteValue.value,
      sector: sectorValue.value,
      descripcion: descripcionValue.value,
      id: ''
    }

    console.log();
    const data = this.newViaje;
    const enlace = 'Viajes';
    data.id = this.database.createId()
    this.database.createDocument<Viaje>(data, enlace, data.id).then( (_) => {
      console.log('Guardado con exito')
      this.presentAlert('Aviso', 'Viaje Guardado con exito.', 'OK')
    });
    console.log('data: ',data);

    nombreValue.value = '';
    patenteValue.value = '';
    precioValue.value = '';
    descripcionValue.value = '';
    precioValue.value = null;
    sectorValue.value = '';
    this.router.navigate(['/home/uno']);
  }

  prueba() {
    console.log('viaje vacio: ',this.newViaje)
    const nombreValue = document.querySelector('#nombre') as HTMLInputElement;
    console.log(nombreValue.value)

    const sectorValue = document.querySelector('#sector') as HTMLInputElement;

    const patenteValue = document.querySelector('#patente') as HTMLInputElement;

    const precioValue = document.querySelector('#precio') as HTMLInputElement;

    const descripcionValue = document.querySelector('#descripcion') as HTMLInputElement;

    this.newViaje = {
      nombre: nombreValue.value,
      precio: parseInt(precioValue.value),
      patente: patenteValue.value,
      sector: sectorValue.value,
      descripcion: descripcionValue.value,
      id: ''
    }

    console.log('viaje lleno', this.newViaje);

  }

  verCambios(){
    console.log('Nombre: ', this.nombre)
    console.log('sector: ', this.sector)
    console.log('patete: ', this.patente)
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
