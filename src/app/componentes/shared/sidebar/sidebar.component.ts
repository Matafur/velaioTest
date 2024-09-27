import { Component } from '@angular/core';
import { menu } from '../../common/models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  templateMenu: menu[] =[
    {
      texto:"Tareas",
      ruta: "./velaio/crear-tareas"
    },
    {
      texto:"Recursos",
      ruta: "./velaio/lista-tareas"
    },

  ]

}
