import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fechaInvalida, nombrePersonaPattern, nombreTareaPattern } from '../../common/validators/validators';
import { tareasInterface } from '../../common/models/models';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-crear-tareas',
  templateUrl: './crear-tareas.component.html',
  styles: [
  ]
})
export class CrearTareasComponent implements OnInit{

  nuevoHabilidad: FormControl = new FormControl('',Validators.required);
  
  
  miFormulario: FormGroup = this.fb.group({
    nombreTarea: [,[Validators.required,Validators.pattern(nombreTareaPattern)]    ],
    fecha:       [, [Validators.required, fechaInvalida()]], 
    nombre:      ['', [Validators.required, Validators.pattern(nombrePersonaPattern)]],
    edad:        ['', [Validators.required, Validators.min(18)]],
    personas:    this.fb.array([],Validators.required),
    habilidades: this.fb.array([],Validators.required),
  })

  get personasArray() {
    return this.miFormulario.get('personas') as FormArray;
  }




  agregarHabilidad(personaIndex: number) {
    if (this.nuevoHabilidad.invalid) {
        return;
    }
    const persona = this.personasArray.at(personaIndex) as FormGroup;
    const habilidadesArray = persona.get('habilidades') as FormArray;
    habilidadesArray.push(this.fb.control(this.nuevoHabilidad.value, Validators.required));
    this.nuevoHabilidad.reset();
}



  getHabilidades(index: number) {
    return this.personasArray.at(index).get('habilidades') as FormArray;
  }
  
  eliminarHabilidad(personaIndex: number, habilidadIndex: number) {
    const persona = this.personasArray.at(personaIndex) as FormGroup;
    const habilidadesArray = persona.get('habilidades') as FormArray;
    habilidadesArray.removeAt(habilidadIndex);
  }  

  validarCampo( campo : string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }
  

  agregarPersona(){
      const nuevaPersona : FormGroup = this.fb.group({
      nombre: [null, [Validators.required, Validators.pattern(nombrePersonaPattern)]],
      edad: [null, [Validators.required, Validators.min(18)]],
      habilidades: this.fb.array([]),  
    });
    this.personasArray.push(nuevaPersona);
    
  }
  
  
  eliminarPersona(index: number) {
    this.personasArray.removeAt(index);
  }

  enviar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const tarea: tareasInterface = {
      nombre: this.miFormulario.value.nombreTarea,
      fecha: this.miFormulario.value.fecha,
      persona: this.miFormulario.value.persona.map((persona: { nombre: any; edad: any; habilidades: any[]; })=> ({
        nombre: persona.nombre,
        edad: persona.edad,
        habilidades: persona.habilidades.map((habilidad: any) => ({ habilidad })) // Asumiendo que deseas un objeto con una propiedad "habilidad"
      }))
    };

    // Enviar la tarea al servicio
    this.tareasService.guardarTarea(tarea);
    console.log(tarea); // Verifica que los datos sean correctos
    this.miFormulario.reset(); // Reinicia el formulario
  }
   
  constructor(
    private fb : FormBuilder,
    private tareasService : TareasService  
  ){}

  ngOnInit(): void {

  }

}
