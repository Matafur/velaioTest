export interface menuInterface{
    texto:string;
    ruta: string;
}

export interface tareasInterface{
    id?:number;
    nombre:string;
    fecha: Date;
    estado?:boolean
    persona: personaInterface[];
}

export interface personaInterface{
    nombre: string;
    edad:number;
    habilidades: habilidadesInterface[]

}

export interface habilidadesInterface{
    habilidad:string
}


