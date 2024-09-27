export interface menu{
    texto:string;
    ruta: string;
}

export interface tareas{
    id:number;
    nombre:string;
    fecha: Date;
    persona: persona;
}

export interface persona{
    nombre: string;
    edad:number;
    habilidades: habilidades[]

}

export interface habilidades{
    habilidad:string
}