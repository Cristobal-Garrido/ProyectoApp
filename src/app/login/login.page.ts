import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';//para enviar informacion a otra pagina
import { AlertController, ToastController } from '@ionic/angular';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiAlumnosService } from '../servicios/api-alumnos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usernames = [];

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
  constructor(
    private router: Router, 
    public toastController: ToastController,
    public _servicio: ApiAlumnosService,
    public http: HttpClient,
    public alertController: AlertController
    ) {

 }
 recuperarPass() {
  console.log("llamado siguiente")
  this.router.navigate(['/login-recover'])
  }

  async fetchWea() {
    return fetch('https://nancyb3a.github.io/Test/usuarios_PGY4121_09.json')
    .then(data => data.json())
  }

  async presentAlert(head, msg, btn) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: [btn],
    });
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async irHome() {
   const input = document.querySelector('#oeoe') as HTMLInputElement;
   const { value } = input;
   const password = document.querySelector('.pass-oeoe') as HTMLInputElement;
   const passwordValue = password.value;
   const er = document.getElementById('er') as HTMLInputElement;
    const z = await this.fetchWea()
    console.log('a: ',z)

    const alumno = z.alumnos.map(a => {
      if(a.username == value && a.password == passwordValue){
       return a;
      } 
    }).filter(b => b != null)

    console.log('alumno: ',alumno)

   if(passwordValue.length < 4 || value.length < 4){
    return;
   }

   if(!value || !passwordValue){
    this.presentToast('Debes ingresar un nombre de usuario/contraseña', 1000)
    return;
   }
   if(alumno.length == 0) {
    this.presentAlert('Error', 'Usuario y/o contraseña incorrecto', 'OK')
    /* er.innerText = `Usuario y/o contraseña incorrectos` */
    setTimeout(function(){
      console.log("Executed after 1 second");
      er.innerText = ``
      }, 5000);
    return
   }
   this.router.navigate(['/home/uno']);

   setTimeout( () => {
    const secondQuery = document.querySelector('.oeoe-title') as HTMLInputElement;
    console.log('nombre alumno: ',z)
    const alumno2 = z.alumnos.map(a => {
      if(a.username == value && a.password == passwordValue){
        secondQuery.innerText = `¡Bienvenid@ ! ${a.nombre}`;
       return a;
      } 
    })
   }, 1)
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