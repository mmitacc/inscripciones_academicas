import type { Request, Response, NextFunction } from "express";
import { estudiantes } from "../types/estudiante.interface.js";

export const validarId = ((req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
            return res.status(400).json({ error: `El id = ${id}, debe ser un numero entero positivo.` })
        }
        return next();
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

export const validarIsEmptyDb = ((_req: Request, res: Response, next: NextFunction) => {
    try {
        if (estudiantes.length === 0) {
            return res.status(404).json({ status: 'La Base de Datos <Estudiante>, esta vacia.' });
        }
        return next();
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});

export const validarErrorPath = ((req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.path !== '/') {
            return res.status(400).json({ error: 'Error en ruta, no se permiten subrutas para este endpoint.' })
        }
        return next();
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Error interno desconocido';
        res.status(500).json({ error: msgError });
    }
});
