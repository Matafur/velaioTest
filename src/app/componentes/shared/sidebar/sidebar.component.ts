import { Component } from '@angular/core';
import { menuInterface } from '../../common/models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  templateMenu: menuInterface[] =[
    {
      texto:"Crear Tareas",
      ruta: "./velaio/crear-tareas"
    },
    {
      texto:"Lista Tareas",
      ruta: "./velaio/lista-tareas"
    },

  ]

}
