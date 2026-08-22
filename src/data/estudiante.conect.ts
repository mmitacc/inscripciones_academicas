import fs from 'fs/promises';
import path from 'path';
import type { Estudiante } from "../types/estudiante.interface.js";

const routDB = path.resolve('src/data/dbEstudiantes.json');
export const loadEstudianteDB = async () => {
    try {
        const dataEstudiantes = await fs.readFile(routDB, 'utf-8');
        return JSON.parse(dataEstudiantes);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        console.error('[ERROR/datos]', msgError);
        return [];
    }
}

export const saveEstudianteDB = async (data: Estudiante[]) => {
    try {
        await fs.writeFile(routDB, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        console.error('[ERROR/datos]', msgError);
        throw msgError;
    }
}
