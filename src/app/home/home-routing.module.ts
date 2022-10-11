import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

//componentes
import { ComponenteUnoComponent } from '../components/componente-uno/componente-uno/componente-uno.component';
import { ComponenteDosComponent } from '../components/componente-dos/componente-dos/componente-dos.component';
import { ComponenteTresComponent } from '../components/componente-tres/componente-tres/componente-tres.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'uno',
        component: ComponenteUnoComponent
      },
      {
        path: 'dos',
        component: ComponenteDosComponent
      },
      {
        path: 'tres',
        component: ComponenteTresComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
