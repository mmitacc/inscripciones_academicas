import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT: number = 3000;

app.use(express.json()); // Middleware para validar datos tipo JSON en POST & PUT

// Modelo de tipo de variables para objetos 'Estudiante'
interface Estudiante {
    id: number;
    nombre: string;
    email: string;
    bootcamp: string;
}
// Se inicializa el array de objetos 'Estudiante'
const estudiantes: Estudiante[] = [];

// Inicialización del servidor
app.listen(PORT, () => {
    try {
        console.clear();
        console.log(`Servidor corriendo en... http://localhost:${PORT}`);
    } catch (error) {
        console.log({ error: error instanceof Error ? error.message : error });
    }
});

// Endpoint para testeo activo del servidor
app.get('/api/status', (req: Request, res: Response) => {
    try {
        res.status(200).json({ 'status': 'Servidor en línea', 'version': '1.0.0' });
    } catch (error) {
        console.log({ error: error instanceof Error ? error.message : error });
    }
});

// Endpoint para retornar la lista completa de estudiantes
app.get('/api/estudiantes', (req: Request, res: Response) => {
    try {
        if (estudiantes.length === 0) {
            return res.status(400).json({ status: 'La Base de Datos <Estudiante>, esta vacia.' });
        }
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
});

// Endpoint retorna al estudiante con el ID especificado
app.get('/api/estudiantes/:id', (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const estudianteSearch = estudiantes.find((e: Estudiante) => e.id === id);
        if (!estudianteSearch) {
            return res.status(400).json({ error: `El estudiante con el id = ${id}, no existe.` });
        }
        res.status(200).json(estudianteSearch);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
});

// Endpoint para guardar a un estudiante nuevo
app.post('/api/estudiantes', (req: Request, res: Response) => {
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
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
});

// Endpoint para actualización de todos los datos del estudiante por su ID
app.put('/api/estudiantes/:id', (req: Request, res: Response) => {
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
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
});

// Endpoint para actualización de algun data del estudiante por su ID
app.patch('/api/estudiantes/:id', (req: Request, res: Response) => {
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
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
});

// Endpoint para eliminar un estudiante por su ID
app.delete('/api/estudiantes/:id', (req: Request, res: Response) => {
    try {
        const id: number = Number(req.params.id);
        const index: number = estudiantes.findIndex(e => e.id === id);
        if (index === -1) {
            return res.status(404).json({ error: `El estudiante con el id = ${id}, no existe.` })
        }
        const [deleteEstudiante] = estudiantes.splice(index, 1);
        res.status(200).json(deleteEstudiante);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
});