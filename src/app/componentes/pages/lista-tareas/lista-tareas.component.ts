import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';



@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styles: [
  ]
})
export class ListaTareasComponent implements OnInit {

  
  
  ngOnInit() {
    this.tareasServices.getTareas(); 
  }

  get tareas (){
    return this.tareasServices.tareas
  }

  constructor(
    private tareasServices : TareasService
  ){}


}