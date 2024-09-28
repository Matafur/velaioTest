import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { CrearTareasComponent } from './crear-tareas/crear-tareas.component';
import { PruebaComponent } from './prueba/prueba.component';



@NgModule({
  declarations: [
    ListaTareasComponent,
    CrearTareasComponent,
    PruebaComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
