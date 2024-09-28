import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fechaInvalida, nombrePersonaPattern, nombreTareaPattern } from '../../common/validators/validators';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styles: [
  ]
})
export class PruebaComponent {

   
  nuevoHabilidad: FormControl = new FormControl('',Validators.required);
  nuevaPersona: FormControl = new FormControl('',Validators.required);
  
  miFormulario: FormGroup = this.fb.group({
    nombreTarea: [,[Validators.required,Validators.pattern(nombreTareaPattern)]    ],
    fecha:       [, [Validators.required, fechaInvalida()]], 
    nombre:      [, [Validators.required, Validators.pattern(nombrePersonaPattern)]  ],
    edad:        [, [Validators.required, Validators.min(18) ]  ],
    personas:    this.fb.array([],Validators.required),
    habilidades: this.fb.array([],Validators.required),


  })
  get personasArray() {
    return this.miFormulario.get('personas') as FormArray;
  }

  
  get habilidadesArray(){
    return this.miFormulario.get('habilidades') as FormArray
  }

  
  
  getHabilidades(index: number) {
    return this.personasArray.at(index).get('habilidades') as FormArray;
  }

  getHabilidadesArray(persona: FormGroup): FormArray {
    return persona.get('habilidades') as FormArray;
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

eliminarHabilidad(personaIndex: number, habilidadIndex: number) {
    const persona = this.personasArray.at(personaIndex) as FormGroup;
    const habilidadesArray = persona.get('habilidades') as FormArray;

    habilidadesArray.removeAt(habilidadIndex);
}
  

  validarCampo( campo : string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }
  
  agregarPersona() {
    const nuevaPersona: FormGroup = this.fb.group({
      nombre: [null, [Validators.required, Validators.pattern(nombrePersonaPattern)]],
      edad: [null, [Validators.required, Validators.min(18)]],
      habilidades: this.fb.array([]),  // Definimos un FormArray para habilidades
    });
  
    this.personasArray.push(nuevaPersona);
  }
  
  


  eliminarPersona(index: number) {
    this.personasArray.removeAt(index);
  }

  enviar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value)
    this.miFormulario.reset()
  }
  
  eliminar(index: number){
    this.habilidadesArray.removeAt(index);

  }

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {

  }

}