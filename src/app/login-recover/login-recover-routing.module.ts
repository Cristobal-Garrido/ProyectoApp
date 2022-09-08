import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRecoverPage } from './login-recover.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRecoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRecoverPageRoutingModule {}
