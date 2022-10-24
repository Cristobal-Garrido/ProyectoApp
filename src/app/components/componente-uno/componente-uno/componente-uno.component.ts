import { Component, OnInit,  NgZone  } from '@angular/core';
import { ServiciobdService } from 'src/app/servicios/serviciobd.service';
import { NavigationExtras, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { Viaje } from 'src/app/models/interfaces';
import { FireBaseBdService } from 'src/app/servicios/fire-base-bd.service';
import { EditComponent } from '../../edit/edit.component';

@Component({
  selector: 'app-componente-uno',
  templateUrl: './componente-uno.component.html',
  styleUrls: ['../../../home/home.page.scss'],
})
export class ComponenteUnoComponent implements OnInit {

  latitude: any = 0; //latitud
  longitude: any = 0; //longitud
  viajeCapturadoUno: any;


  options = {
      timeout: 10000, 
      enableHighAccuracy: true, 
      maximumAge: 3600
  };

  viajes: Viaje[] = [];

  loading: any;

  private path = 'home/uno'

  constructor(
    private router:Router,
    public baseDatosService: FireBaseBdService,
    public loadingController: LoadingController,
    private geolocation: Geolocation,
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
  }

  async edit(viaje) {
    this.router.navigate(['/home/edit']);
    this.recibirViajeBd(viaje);
    /* this.router.navigate(['/home/uno']); */
  }


  recibirViajeBd(viaje) {
    this.baseDatosService.viajeEdit = viaje;
  }

  mostrarViajeCapturado() {
    console.log('viajeEdit: ',this.baseDatosService.viajeEdit)
  }

}

