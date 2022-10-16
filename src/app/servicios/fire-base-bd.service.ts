import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseBdService {

  //servicio injectado
  constructor(public Firestore: AngularFirestore) { }

  createDocument<tipo>(data: tipo, enlace: string) {
    const ref = this.Firestore.collection<tipo>(enlace);
    return ref.add(data);
  }

  deleteDocument() {

  }
  
  getDocument() {

  }

  editDocument() {

  }

}
