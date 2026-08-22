import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import estudiantesRouter from './routes/estudiante.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../src/swagger_output.json' with {type: 'json'};
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware para CORS
app.use(cors());

// Middleware para validar datos tipo JSON en POST & PUT
app.use(express.json());

// Middleware para visualizar en consola las interacciones con los endpoints
app.use((req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// Middleware para auto-documentación con librería Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Middleware para todos los endpoints de estudiantes
app.use('/api/students', estudiantesRouter)

// Endpoint para testeo activo del servidor
app.get('/', (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['Initial Test']
    #swagger.summary = 'Verificar el estado de la API'
    #swagger.description = 'Retorna si el servicio se encuentra activo y respondiendo.'
    */
    try {
        res.status(200).json({ 'status': 'Servidor en línea', 'version': '1.0.0' });
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

// Last Middleware para capturar errores en rutas
app.use(errorHandler)

// Inicialización del servidor
console.clear();
app.listen(PORT, () => {
    try {
        console.log(`Servidor corriendo en... http://localhost:${PORT}`);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        console.log({ error: msgError });
    }
});



