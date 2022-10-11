import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/clases/viaje';
import { ServiciobdService } from 'src/app/servicios/serviciobd.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-componente-uno',
  templateUrl: './componente-uno.component.html',
  styleUrls: ['../../../home/home.page.scss'],
})
export class ComponenteUnoComponent implements OnInit {

  viajes: Viaje[];

  constructor(private servicioBD:ServiciobdService, private router:Router) { }

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

}
