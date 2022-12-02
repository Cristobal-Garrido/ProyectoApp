import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
  ABC: string = '';

  setValue() {
    this.ABC = 'Que funcione la wea'
  }
}
