import express from 'express';
import type { Request, Response } from 'express';
import estudiantesRouter from './routes/estudiante.route.js';

const app = express();
const PORT: number = 3000;

// Middleware para validar datos tipo JSON en POST & PUT
app.use(express.json());

// Middleware para todos los endpoints de estudiantes
app.use('/api/estudiantes', estudiantesRouter)

// Endpoint para testeo activo del servidor
app.get('/api/status', (req: Request, res: Response) => {
    try {
        res.status(200).json({ 'status': 'Servidor en línea', 'version': '1.0.0' });
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

// Inicialización del servidor
app.listen(PORT, () => {
    try {
        console.clear();
        console.log(`Servidor corriendo en... http://localhost:${PORT}`);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        console.log({ error: msgError });
    }
});



