import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;

  data:any={
    user:"",
    password:"",
  }


  constructor(private activeroute: ActivatedRoute, private router: Router, public alertController: AlertController) {
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado
        console.log(this.user) // Muestra por consola lo traido
      }else{this.router.navigate(["/login"])} // Si no tiene extra la navegacion actual navegar al login
    });
  }

}
