import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginRecoverPageRoutingModule } from './login-recover-routing.module';

import { LoginRecoverPage } from './login-recover.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginRecoverPageRoutingModule
  ],
  declarations: [LoginRecoverPage]
})
export class LoginRecoverPageModule {}
