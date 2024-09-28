import { Component, Input, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { tareasInterface } from '../../common/models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-lista-tareas',
  standalone: true, 
  templateUrl: './lista-tareas.component.html',
  styles: [],
  imports: [CommonModule, FormsModule, RouterModule] 
})
export class ListaTareasComponent implements OnInit {

  
  filtroEstado: string = ''; 
  tareasFiltradas: tareasInterface[]= []; 

  constructor(
    private router: Router,
    private tareasServices: TareasService) {}

  ngOnInit() {
    this.tareasServices.getTareas();
    this.filtrarTareas(); 
  }

 get tareas() {
    return this.tareasServices.tareas;
  }

  editarTarea(id: number) {
    this.router.navigate(['/editar-tarea', id]);
  }

  filtrarTareas() {
    switch (this.filtroEstado) {
        case 'todas':
            this.tareasFiltradas = this.tareas;
            break;
        case 'pendiente':
            this.tareasFiltradas = this.tareas.filter(tarea => !tarea.estado);
            break;
        case 'terminada':
            this.tareasFiltradas = this.tareas.filter(tarea => tarea.estado);
            break;
        default:
            break;
    }
}
}

