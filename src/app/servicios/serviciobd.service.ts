import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiciobdService {

  public database: SQLiteObject;
  tblViajes:string = "CREATE TABLE IF NOT EXISTS viaje(id INTEGER PRIMARY KEY autoincrement, conductor VARCHAR(50) NOT NULL, texto TEXT NOT NULL);";
  //registro:string = "INSERT or IGNORE INTO noticia(id, titulo,texto) VALUES (1,'Titulo de la noticia','texto de la noticia');";
  listaViajes = new BehaviorSubject([]);
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController
    
    ) {
     
     }

     

     
    

    

    async presentToast(mensaje: string) {
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 3000
      });
      toast.present();
    }
}
