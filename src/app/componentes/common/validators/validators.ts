import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const nombrePersonaPattern: string = "^([a-zA-Z]+){5}"
export const nombreTareaPattern: string = "([a-zA-Z0-9._%+-]+){3}"



export function fechaInvalida(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaRecibida = new Date(control.value);
      const fechaHoy = new Date();
  
      
      if (fechaRecibida < fechaHoy) {
        return { fechaMenor: true }; 
      }
  
      return null; 
    };
  }


