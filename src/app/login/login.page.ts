import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';//para enviar informacion a otra pagina
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngOnInit() {
  }

  //modelo de usuario
  user = {
    usuario: "",
    password: ""
  }
    field: string = "";//guardar campo faltante    
                    //instanciar imports
  constructor(private router: Router, public toastController: ToastController) {

 }
 recuperarPass() {
  console.log("llamado siguiente")
  this.router.navigate(['/login-recover'])
  }

  iniciar(){
    //Validar
    if (this.validateModel(this.user)) {
      this.presentToast("Bienvenido "+ this.user.usuario)
      //instanciar navigationExtras
        let navigationExtras: NavigationExtras = {
          state: {
            user: this.user
          }
        };
        this.router.navigate(['/home'], navigationExtras);
    }else{
      this.presentToast("Error, falta: "+this.field, 5500)//cambiar
    }
  }

  validateModel(model: any) {

    for (var [key, value] of Object.entries(model)) {
      //validar que no este vacio
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }
  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 5000
    });
    toast.present();
  }


}
