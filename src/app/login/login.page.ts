import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';//para enviar informacion a otra pagina
import { ToastController } from '@ionic/angular';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngOnInit() {
  }

  errors = [
    {type: 'required', message: '¿Olvidas algo? ¡Usuario vacio!'},
    {type: 'maxlength', message: 'Usuario No puede tener mas de 15 caracteres'},
    {type: 'minlength', message: 'Usuario Debe tener al menos 4 caracteres'},
  ]

  errorsPass = [
    {type: 'required', message: '¿Olvidas algo? ¡Contraseña vacia!'},
    {type: 'maxlength', message: 'No puede tener mas de 15 caracteres'},
    {type: 'minlength', message: 'Debe tener al menos 4 caracteres'},
  ]


  login = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]),
    pass: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)])
  })

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

  irHome() {
   const input = document.querySelector('#oeoe') as HTMLInputElement;
   const { value } = input;
   const password = document.querySelector('.pass-oeoe') as HTMLInputElement;
   const passwordValue = password.value;

   if(passwordValue.length < 4 || value.length < 4){
    return;
   }
   
   if(!value || !passwordValue){
    this.presentToast('Debes ingresar un nombre de usuario/contraseña', 1000)
    return;
   }

   this.router.navigate(['/home']);

   setTimeout( () => {
    const secondQuery = document.querySelector('.oeoe-title') as HTMLInputElement;
    /* secondQuery.innerText = `¡Bienvenid@ ! ${value}`; */
   }, 0)
  }

  iniciar(){
    //Validar
    if (this.validateModel(this.user)) {
      this.presentToast("Se ha iniciado sesión correctamente ")
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