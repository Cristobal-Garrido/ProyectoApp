import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
/* import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http'; */


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    /* SQLite, */
    /* HttpClientModule,
    HttpHeaders,
    HttpErrorResponse,
    HttpClient */
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}

/* CommonModule,
FormsModule,
ReactiveFormsModule,
IonicModule,
LoginPageRoutingModule
 */