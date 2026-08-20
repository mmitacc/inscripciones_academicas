import type { Request, Response } from 'express';

import type { Estudiante } from '../types/estudiante.interface.js';
import { estudiantes } from '../types/estudiante.interface.js';
import type { RequestQuery } from '../types/global.types.js';


// Método para retornar la lista completa de estudiantes
export const getQueryEstudiantes = ((req: Request, res: Response) => {
    try {
        if (estudiantes.length === 0) {
            return res.status(400).json({ status: 'La Base de Datos <Estudiante>, esta vacia.' });
        }
        const query = req.query as RequestQuery<Estudiante>;
        const { nombre, email, bootcamp } = query;
        let queryEstudiantes: Estudiante[] = [...estudiantes];
        let enviroment: string = 'Filtro por ';
        // query: nombre
        if (nombre) {
            queryEstudiantes = queryEstudiantes.filter(e => e.nombre.toLowerCase().includes(nombre.toLowerCase()))
            enviroment += ':: nombre ';
        }
        // query: email
        if (email) {
            queryEstudiantes = queryEstudiantes.filter(e => e.email.toLowerCase().includes(email.toLowerCase()))
            enviroment += ':: email ';
        }
        // query: bootcamp
        if (bootcamp) {
            queryEstudiantes = queryEstudiantes.filter(e => e.bootcamp.toLowerCase().includes(bootcamp.toLowerCase()))
            enviroment += ':: bootcamp ';
        }
        let data: Estudiante[] = [];
        if (queryEstudiantes.length === estudiantes.length) {
            data = [...estudiantes];
            enviroment = 'All';
        } else {
            data = [...queryEstudiantes];
        }
        res.status(200).json({ Enviroment: enviroment, Total: data.length, Data: data });
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

// Método retorna al estudiante con el ID especificado
export const getIdEstudiante = ((req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const estudianteSearch = estudiantes.find((e: Estudiante) => e.id === id);
        if (!estudianteSearch) {
            return res.status(400).json({ error: `El estudiante con el id = ${id}, no existe.` });
        }
        res.status(200).json(estudianteSearch);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

// Método para guardar a un estudiante nuevo
export const newEstudiante = ((req: Request, res: Response) => {
    try {
        const { nombre, email, bootcamp } = req.body;
        if (!email) {
            return res.status(400).json({ error: "El campo 'email' es obligatorio." })
        }
        const newId: number = estudiantes.length === 0 ? 1 : estudiantes.length + 1;
        const newEstudiante: Estudiante = {
            id: newId,
            nombre: nombre ?? '',
            email,
            bootcamp: bootcamp ?? ''
        }
        estudiantes.push(newEstudiante);
        res.status(201).json(newEstudiante);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

// Método para actualización de todos los datos del estudiante por su ID
export const actualizarTodoEstudiante = ((req: Request, res: Response) => {
    try {
        const id: number = Number(req.params.id);
        const index: number = estudiantes.findIndex(e => e.id === id);
        if (index === -1) {
            return res.status(404).json({ error: `El estudiante con el id = ${id}, no existe.` })
        }
        const { nombre, email, bootcamp } = req.body;
        if (!email) {
            return res.status(400).json({ error: "El campo 'email' es obligatorio." })
        }
        estudiantes[index] = {
            id,
            nombre: nombre ?? '',
            email,
            bootcamp: bootcamp ?? ''
        };
        res.status(200).json(estudiantes[index]);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

// Método para actualización de algun data del estudiante por su ID
export const actualizarAlgunDatoEstudiante = ((req: Request, res: Response) => {
    try {
        const id: number = Number(req.params.id);
        const index: number = estudiantes.findIndex(e => e.id === id);
        if (index === -1) {
            return res.status(404).json({ error: `El estudiante con el id = ${id}, no existe.` })
        }
        const { nombre, email, bootcamp } = req.body;
        const currentEstudiante: Estudiante = estudiantes[index]!;
        estudiantes[index] = {
            id,
            nombre: nombre ?? currentEstudiante.nombre,
            email: email ?? currentEstudiante.email,
            bootcamp: bootcamp ?? currentEstudiante.bootcamp
        };
        res.status(200).json(estudiantes[index]);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

// Método para eliminar un estudiante por su ID
export const eliminarEstudiante = ((req: Request, res: Response) => {
    try {
        const id: number = Number(req.params.id);
        const index: number = estudiantes.findIndex(e => e.id === id);
        if (index === -1) {
            return res.status(404).json({ error: `El estudiante con el id = ${id}, no existe.` })
        }
        const [deleteEstudiante] = estudiantes.splice(index, 1);
        res.status(200).json(deleteEstudiante);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});