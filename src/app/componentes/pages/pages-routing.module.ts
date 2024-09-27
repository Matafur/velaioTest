import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearTareasComponent } from './crear-tareas/crear-tareas.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';

const routes: Routes = [
  {
    path:"",
    children:[
      {path:"crear-tareas", component: CrearTareasComponent},
      {path:"lista-tareas", component: ListaTareasComponent},
      {path:"**", redirectTo: "tareas"},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
