import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[${req.method} ${req.path}]`, error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
}