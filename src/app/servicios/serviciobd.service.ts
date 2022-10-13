import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Viaje } from '../clases/viaje'

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
      this.crearBD();
     }

     crearBD() {
      this.platform.ready().then(() => {
        this.sqlite.create({
          name: 'viajes.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          this.database = db;
          this.presentToast("BD creada");
          //llamo a crear la(s) tabla(s)
          this.crearTablas();
        }).catch(e => this.presentToast(e));
      })
     }

     async crearTablas() {
      try {
        await this.database.executeSql(this.tblViajes,[]);
        //await this.database.executeSql(this.registro,[]);
        this.presentToast("Tabla creada");
        this.cargarViajes();
        this.isDbReady.next(true); 
      } catch (error) {
        this.presentToast("Error en Crear Tabla: "+error);
      }
     }

     cargarViajes() {
      return this.database.executeSql('SELECT * FROM viaje',[])
      .then(res=>{
        let items:Viaje[]=[];
        if(res.rows.length>0){
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id:res.rows.item(i).id,
              conductor:res.rows.item(i).conductor,
              texto:res.rows.item(i).texto
            });          
          }
        }
        this.listaViajes.next(items);
      });
    }

    addViaje(conductor,texto){
      let data=[conductor,texto];
      return this.database.executeSql('INSERT INTO viaje(conductor,texto) VALUES(?,?)',data)
      .then(()=>{
        this.cargarViajes();
      });
    }

    updateViaje(id,conductor,texto){
      let data=[conductor,texto,id];
      return this.database.executeSql('UPDATE viaje SET conductor=?, texto=? WHERE id=?',data)
      .then(()=>{
        this.cargarViajes();
      });
    }

    deleteViaje(id){
      return this.database.executeSql('DELETE FROM viaje WHERE id=?',[id])
      .then(()=>{
        this.cargarViajes();
      });
    }

    dbState(){
      return this.isDbReady.asObservable();
    }

    fetchViajes(): Observable<Viaje[]> {
      return this.listaViajes.asObservable();
    }

    async presentToast(mensaje: string) {
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 3000
      });
      toast.present();
    }
}
