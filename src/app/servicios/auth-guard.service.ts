import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  estaLoggeado = false;
  constructor(){ }
  estaAutenticado(){
    return this.estaLoggeado;
  }
}