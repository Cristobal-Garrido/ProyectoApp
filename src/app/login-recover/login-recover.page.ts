import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-recover',
  templateUrl: './login-recover.page.html',
  styleUrls: ['./login-recover.page.scss'],
})
export class LoginRecoverPage implements OnInit {

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  irLogin() {
    console.log("llamado siguiente")
    this.router.navigate(['../login'])
    }
}
