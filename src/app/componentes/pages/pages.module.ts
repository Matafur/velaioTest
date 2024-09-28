import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { CrearTareasComponent } from './crear-tareas/crear-tareas.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { EditarTareaComponent } from './editar-tarea/editar-tarea.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    CrearTareasComponent,
    EditarTareaComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ListaTareasComponent
  ]
})
export class PagesModule { }
