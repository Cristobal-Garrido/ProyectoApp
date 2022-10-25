import { Component, OnInit,  NgZone, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ServiciobdService } from 'src/app/servicios/serviciobd.service';
import { NavigationExtras, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { Viaje } from 'src/app/models/interfaces';
import { FireBaseBdService } from 'src/app/servicios/fire-base-bd.service';

import { Popup, Marker } from 'mapbox-gl';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
//npm install --save mapbox-gl
//npm install --save-dev @types/mapbox-gl
mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc3RvYmFsLWdhcnJpZG8iLCJhIjoiY2w5bnBkMmowMDRnYjN1bXd1ZW8yNXZkcCJ9.enFPbRymB4K5HWOIWNxfgA';



@Component({
  selector: 'app-componente-uno',
  templateUrl: './componente-uno.component.html',
  styleUrls: ['../../../home/home.page.scss'],
})
export class ComponenteUnoComponent implements OnInit {

  latitude: any = 0; //latitud
  longitude: any = 0; //longitud
  coordenadas:any;

  options = {
      timeout: 10000, 
      enableHighAccuracy: true, 
      maximumAge: 3600
  };

  viajes: Viaje[] = [];

  loading: any;

  private path = 'home/uno'

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef


  constructor(
    private router:Router,
    public baseDatosService: FireBaseBdService,
    public loadingController: LoadingController,
    private geolocation: Geolocation
    ) { }

  ngOnInit(): void {
    console.log('this.viajes: ',this.viajes)
    this.presentLoading();
    this.getItems();

  }


  getItems() {
    this.presentLoading();
    const enlace = 'Viajes';
    this.baseDatosService.getCollectionChanges<Viaje>(enlace).subscribe( res => {
      this.viajes = res;
    });
  }

  deleteItem(viaje: Viaje) {
    const enlace = 'Viajes';
    this.baseDatosService.deleteDocument(enlace, viaje.id);
    
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando Viajes',
      duration: 2000
    })
    await this.loading.present();
  }

  editItem() {
    this.baseDatosService.validateEdit();
  }

  verificar() {
    this.baseDatosService.verificarbtn();

  }
  

  obtenerCoordenadasActuales(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error obteniendo posición',error);
    })
    if ( !this.obtenerCoordenadasActuales ) throw Error('No hay placesService.userLocaation')
    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.longitude,this.latitude ], // starting position [lng, lat]
      zoom: 14, // starting zoom
      });
    this.coordenadas = this.longitude,this.latitude
    const popup = new Popup()
      .setHTML(`
      <h6>Aquí Estas</h6>
      <span>Estás en este lugar de la Tierra</span>
      `);
    new Marker({ color: 'red '})
      .setLngLat({lng:this.longitude, lat: this.latitude})
      .setPopup( popup )
      .addTo( map )
      
  }
}

/*   ngOnInit(){
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
  

  /* eliminar(item) {
    this.servicioBD.deleteViaje(item.id);
    this.servicioBD.presentToast("Viaje Eliminado"); */




