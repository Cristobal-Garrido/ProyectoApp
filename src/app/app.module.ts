import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AuthService } from './servicios/auth-guard.service';
import { AuthGuard } from './servicios/auth-guard.guard';
/* import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http'; */


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
    /* SQLite, */
    /* HttpClientModule,
    HttpHeaders,
    HttpErrorResponse,
    HttpClient */
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Geolocation, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

/* CommonModule,
FormsModule,
ReactiveFormsModule,
IonicModule,
LoginPageRoutingModule
 */