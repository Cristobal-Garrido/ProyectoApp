import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciobdService } from 'src/app/servicios/serviciobd.service';

@Component({
  selector: 'app-componente-dos',
  templateUrl: './componente-dos.component.html',
  styleUrls: ['../../../home/home.page.scss'],
})
export class ComponenteDosComponent implements OnInit {

  nombreConductor = "";
  textoViaje = "";
  constructor(private dbservice: ServiciobdService, private router: Router) { }

  guardar() {
    this.dbservice.addViaje(this.nombreConductor,this.textoViaje);
    this.dbservice.presentToast("Viaje Agregado");
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
