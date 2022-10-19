import { Component, OnInit,  NgZone  } from '@angular/core';
import { Viaje } from 'src/app/clases/viaje';
import { ServiciobdService } from 'src/app/servicios/serviciobd.service';
import { NavigationExtras, Router } from '@angular/router';
//ionic cordova plugin add cordova-plugin-geolocation
// o
//npm install cordova-plugin-geolocation
//npm install @ionic-native/native-geocoder
//npm install @ionic-native/geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-componente-uno',
  templateUrl: './componente-uno.component.html',
  styleUrls: ['../../../home/home.page.scss'],
})
export class ComponenteUnoComponent implements OnInit {

  latitude: any = 0; //latitud
  longitude: any = 0; //longitud

  viajes: Viaje[];

  constructor(private servicioBD:ServiciobdService,
    private router:Router, private geolocation: Geolocation) {}

  options = {
      timeout: 10000, 
      enableHighAccuracy: true, 
      maximumAge: 3600
  };

  ngOnInit(){
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.viajes=item;
        })
      }
    })
  }

  getItem($event) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
    this.servicioBD.presentToast(valor);

  }

  editar(item) {
    let navigationExtras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        tituloEnviado : item.conductor,
        textoEnviado : item.texto
      }
    }
    /* this.router.navigate(['/modificar'],navigationExtras); */
  }

  eliminar(item) {
    this.servicioBD.deleteViaje(item.id);
    this.servicioBD.presentToast("Viaje Eliminado");
  }

  obtenerCoordenadasActuales(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error obteniendo posición',error);
    })
  }
}