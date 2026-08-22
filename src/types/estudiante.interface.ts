// Modelo de tipo de variables para objetos 'Estudiante'
export interface Estudiante {
    id: number;
    name: string;
    email: string;
    bootcamp: string;
};

export type EstudiantePatchQuery = Partial<Omit<Estudiante, 'id'>>;