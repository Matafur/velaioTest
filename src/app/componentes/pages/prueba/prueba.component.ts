import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { fechaInvalida, nombrePersonaPattern, nombreTareaPattern } from '../../common/validators/validators';
import { TareasService } from '../../services/tareas.service';
import { tareasInterface } from '../../common/models/models';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styles: [
  ]
})
export class PruebaComponent implements OnInit {

  // Inicio de variable
  public miFormulario: FormGroup = new FormGroup({})

  
  ngOnInit(): void {
    this.initmiFormulario();
    this.miFormulario.get('personas')?.valueChanges.subscribe(() => {
      this.miFormulario.updateValueAndValidity();
    });
  }

  initmiFormulario(){
    this.miFormulario = new FormGroup(
      {
        nombreTarea: new FormControl ('',[Validators.required,Validators.pattern(nombreTareaPattern)]),
        fecha:       new FormControl('', [Validators.required, fechaInvalida()]), 
        estado:      new FormControl('', Validators.required),
        personas:    new FormArray([],Validators.required),
        
      }
    )
  }

  initFormPersona(){
    return new FormGroup(
      {
      nombre:      new FormControl('', [Validators.required, Validators.pattern(nombrePersonaPattern)]),
      edad:        new FormControl('', [Validators.required, Validators.min(18)]),
      habilidades: new FormArray([],Validators.required),
      }
    )}

    get personasArray() {
      return this.miFormulario.get('personas') as FormArray;
     }
     

    get personasLength(): number {
      return this.personasArray.length; 
    }
     

    agregarPersona():void{
      this.personasArray.push(this.initFormPersona())
    }

    getCtrl(key:string,form: FormGroup):any{
      return form.get(key)
    }

    habilidadesArray(indexPersona: number): FormArray {
      const personaFormGroup = this.personasArray.at(indexPersona) as FormGroup;
      return personaFormGroup.get('habilidades') as FormArray;
    }

    agregarHabilidad(indexPersona: number, habilidadInput: HTMLInputElement): void {
      const habilidadesArray = this.habilidadesArray(indexPersona);
        
      if (habilidadInput.value.trim()) {
        habilidadesArray.push(new FormControl(habilidadInput.value, Validators.required));
        habilidadInput.value = ''; 
      }
    }
    
    eliminarHabilidad(indexPersona: number, indexHabilidad: number): void {
      const habilidadesArray = this.habilidadesArray(indexPersona);
      habilidadesArray.removeAt(indexHabilidad);
    }
    
    

  validarCampo( campo : string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  validarCampoArray(campo: string, index: number): boolean | null {
    const personasArray = this.miFormulario.get('personas') as FormArray;
    const personaFormGroup = personasArray.at(index) as FormGroup;
    return personaFormGroup.controls[campo].errors && personaFormGroup.controls[campo].touched;
  }


    
  eliminarPersona(index: number) {
    this.personasArray.removeAt(index);
  }


  enviar() {
    // Verifica si el formulario es válido
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      console.log("Formulario no enviado. Errores:", this.miFormulario.errors);
      console.log("Tarea enviada:", this.miFormulario);
      return; 
    }
  
    
    const tarea: tareasInterface = {
      nombre: this.miFormulario.value.nombreTarea,
      fecha: this.miFormulario.value.fecha,
      estado: this.miFormulario.value.estado === 'completada', 
      persona: this.miFormulario.value.personas.map((persona: { nombre: any; edad: any; habilidades: any[]; }) => ({
        nombre: persona.nombre,
        edad: persona.edad,
        habilidades: persona.habilidades 
      }))
    };
  

    this.tareasService.guardarTarea(tarea);
    console.log("Tarea enviada:", tarea);
    alert("Tarea")
    this.miFormulario.reset(); 
  }
  
  
  
  constructor(
    private tareasService : TareasService  
  ){}

}
