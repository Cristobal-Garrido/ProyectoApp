import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje } from 'src/app/models/interfaces';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-componente-dos',
  templateUrl: './componente-dos.component.html',
  styleUrls: ['../../../home/home.page.scss'],
})
export class ComponenteDosComponent implements OnInit {

  //Atributos por defecto
  newViaje: Viaje = {
    nombre: '',
    precio: null,
    patente: '',
    sector: '',
    descripcion: ''
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

  constructor(private router: Router) { }

  @ViewChild('nombre') referencia : ElementRef;


  ngOnInit() {
  }

  save() {
    console.log('Fullname', this.fullname)
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
      descripcion: descripcionValue.value
    }

    console.log('viaje lleno', this.newViaje);

    /* @ViewChild('nombre') referencia : ElementRef;

    console.log('Nombre: ', this.nombre)
    console.log('sector: ', this.sector)
    console.log('patete: ', this.patente)
    /* console.log('Referecia: ',this.referencia.nativeElement.innerText); */
    /* const p = document.querySelector('#p') as HTMLElement;
    p.innerText = value; */
  }

  verCambios(){
    console.log('Nombre: ', this.nombre)
    console.log('sector: ', this.sector)
    console.log('patete: ', this.patente)
  }

/*   onfocusPlace(event) {
    this.newViaje.nombre = event.target.value;
    console.log('Event: ',this.newViaje.nombre)
  } */

}
