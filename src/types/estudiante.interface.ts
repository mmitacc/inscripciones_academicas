// Modelo de tipo de variables para objetos 'Estudiante'
export interface Estudiante {
    id: number;
    nombre: string;
    email: string;
    bootcamp: string;
}
// Se inicializa el array de objetos 'Estudiante'
export const estudiantes: Estudiante[] = [];