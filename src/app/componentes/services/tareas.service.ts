import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tareasInterface } from '../common/models/models';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  public tareas : tareasInterface[] = []
  public url    : string = "http://localhost:3000/tareas"
  constructor(
    private http : HttpClient
  ) { }



  getTareas(){
    this.http.get(this.url)
      .subscribe((resp:any)=>{
        this.tareas = resp
        //console.log(resp)
      }
    )
  }

  guardarTarea(tarea: tareasInterface) {
    this.http.post<tareasInterface>(this.url, tarea)
      .subscribe(resp => {
        console.log('Tarea guardada:', resp);
        this.getTareas(); // Opcional: recargar tareas si necesitas
      });
  }





  

}
