import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Viaje } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FireBaseBdService {

  public edit = false;

  /* newViaje: Viaje = {
    nombre: '',
    precio: 1000,
    patente: '',
    sector: '',
    descripcion: '',
    id: ''
  } */

  //servicio injectado
  constructor(public Firestore: AngularFirestore) { }

  createDocument<tipo>(data: tipo, enlace: string, id: string) {
    
    const ref = this.Firestore.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }

  validateEdit() {
    this.edit = true;
    console.log('edit =', this.edit);
    return this.edit;
  }

  verificarbtn() {
    console.log('El boton ahora es: ', this.edit);
  }

  createId() {
    return this.Firestore.createId();
  }

  deleteDocument(path: string, id: string) {
    const collection = this.Firestore.collection(path);
    return collection.doc(id).delete();
  }
  
  getCollectionChanges<tipo>(enlace: string): Observable<tipo[]> {
    const ref = this.Firestore.collection<tipo>(enlace);
    /* const itemsCollection: AngularFirestoreCollection<tipo> = this.Firestore.collection<tipo>(enlace); */
    /* return itemsCollection.valueChanges(); */
    return ref.valueChanges();
  }

  updateDocument(data: any, enlace: string, id: string) {
    const collection = this.Firestore.collection(enlace);
    return collection.doc(id).update(data);
  }

}
