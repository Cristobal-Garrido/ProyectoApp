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
    const nombreValue = document.querySelector('#nombre');
    const nombreString = nombreValue.toString();

    const sectorValue = document.querySelector('#sector');
    const sectorString = sectorValue.toString();

    const patenteValue = document.querySelector('#patente');
    const patenteString = patenteValue.toString();

    const precioValue = document.querySelector('#precio');
    const precioString = precioValue.toString();
    const precioInt = parseInt(precioString);

    const descripcionValue = document.querySelector('#descripcion');
    const descripcionString = descripcionValue.toString() 

    this.newViaje = {
      nombre: nombreString,
      precio: precioInt,
      patente: patenteString,
      sector: sectorString,
      descripcion: descripcionString
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
