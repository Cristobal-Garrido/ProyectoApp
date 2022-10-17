import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiAlumnosService {

  constructor(public _http: HttpClient ) { }

  getData<T>(url : string) {
    url = 'https://nancyb3a.github.io/Test/usuarios_PGY4121_09.json'
    this._http.get<T[]>(url);
  }
}
