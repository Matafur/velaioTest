import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { CrearTareasComponent } from './crear-tareas/crear-tareas.component';


@NgModule({
  declarations: [
    ListaTareasComponent,
    CrearTareasComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
