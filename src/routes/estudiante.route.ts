import { Router } from 'express';
import type { Request, Response, NextFunction } from "express";
import { getQueryEstudiantes, getIdEstudiante, newEstudiante, actualizarTodoEstudiante, actualizarAlgunDatoEstudiante, eliminarEstudiante } from '../controllers/estudiante.controller.js';
import { validarIsEmptyDb, validarId, validarErrorPath, validarFormatoEmail } from '../middlewares/validalar.middleware.js';

const router: Router = Router();

// Endpoint para retornar querys o la lista completa de estudiantes
router.get('/', validarIsEmptyDb, (req: Request, res: Response) => {
    /*  
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Obtener y filtrar estudiantes'
    #swagger.description = 'Retorna la lista de estudiantes permitiendo filtrar por nombre, email o bootcamp.'
    #swagger.parameters['nombre'] = {
        in: 'query',
        description: 'Filtro por nombre del estudiante',
        required: false,
        type: 'string'
    }
    #swagger.parameters['email'] = {
        in: 'query',
        description: 'Filtro por correo electrónico',
        required: false,
        type: 'string'
    }
    #swagger.parameters['bootcamp'] = {
        in: 'query',
        description: 'Filtro por nombre del bootcamp',
        required: false,
        type: 'string'
    }
    #swagger.responses = {
        200: {
            description: 'Estudiantes hallados correctamente.',
            schema: {
                type: 'array',
                items: { $ref: '#/definitions/Estudiante' }
            }
        },  
        404: {
            description: 'El estudiante solicitado no existe.',
            schema: { error: 'El estudiante con el id = 99, no existe.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    getQueryEstudiantes(req, res);
});

// Endpoint retorna al estudiante con el ID especificado
router.get('/:id', validarIsEmptyDb, validarId, (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Obtener un estudiante por ID'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del estudiante',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Estudiante ubicado exitosamente.',
            schema: { id: 1, nombre: 'Juan', email: 'juan@gmail.com', bootcamp: 'Developer'}
        },
        404: {
            description: 'El estudiante solicitado no existe.',
            schema: { error: 'El estudiante con el id = 99, no existe.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    getIdEstudiante(req, res);
});

// Endpoint para guardar a un estudiante nuevo
router.post('/', validarFormatoEmail, (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Crear un registro de estudiante nuevo'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos para el nuevo estudiante. Solo el \"email\" es obligatorio. Pero si no ingresan los otros datos, se grabaran como vacios',
        required: true,
        schema: {
            nombre: 'Juan Pérez',
            email: 'juan.perez@gmail.com',
            bootcamp: 'Fullstack'
        }
    }
    #swagger.responses = {
        200: {
            description: 'Estudiante registrado correctamente',
            schema: { id: 1, nombre: 'Juan', email: 'juan@gmail.com', bootcamp: 'Developer'}
        },
        400: {
            description: 'El estudiante solicitado no existe.',
            schema: { error: 'El campo email es obligatorio.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    newEstudiante(req, res);
});

// Endpoint para actualización de todos los datos del estudiante por su ID
router.put('/:id', validarIsEmptyDb, validarId, validarFormatoEmail, (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Actualizar todos los datos de un estudiante'
    #swagger.description = 'Modifica todos campos (nombre, email, bootcamp) de un estudiante buscando por su ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del estudiante a actualizar',
        required: true,
        type: 'number'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Campos que se desean actualizar. Solo el \"email\" es obligatorio. Pero si no ingresan los otros datos, se grabaran como vacios',
        required: true,
        schema: {
            nombre: 'Juan',
            email: 'juan@gmail.com',
            bootcamp: 'Fullstack'
        }
    }
    #swagger.responses = {
        200: {
            description: 'Actualización realizada con éxito.',
            schema: { id: 1, nombre: 'Juan', email: 'juan@gmail.com', bootcamp: 'Developer'}
        },
        404: {
            description: 'El estudiante solicitado no existe.',
            schema: { error: 'El estudiante con el id = 99, no existe.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    actualizarTodoEstudiante(req, res);
});

// Endpoint para actualización de algun data del estudiante por su ID
router.patch('/:id', validarIsEmptyDb, validarId, validarFormatoEmail, (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Actualizar datos parciales de un estudiante'
    #swagger.description = 'Modifica uno o varios campos (nombre, email, bootcamp) de un estudiante buscando por su ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del estudiante a actualizar',
        required: true,
        type: 'number'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Puede llenar uno o más campos para actualizarlos.',
        required: true,
        schema: {
            nombre: 'Juan',
            email: 'juan@gmail.com',
            bootcamp: 'Fullstack'
        }
    }
    #swagger.responses = {
        200: {
            description: 'Actualización realizada con éxito.',
            schema: { id: 1, nombre: 'Juan', email: 'juan@gmail.com', bootcamp: 'Developer'}
        },
        404: {
            description: 'El estudiante solicitado no existe.',
            schema: { error: 'El estudiante con el id = 99, no existe.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    actualizarAlgunDatoEstudiante(req, res);
});

// Endpoint para eliminar un estudiante por su ID
router.delete('/:id', validarIsEmptyDb, validarId, (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Eliminar un estudiante por ID'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico del estudiante',
    required: true,
    type: 'integer'
    }
    #swagger.responses = {
        200: {
            description: 'Estudiante eliminado',
            schema: { id: 1, nombre: 'Juan', email: 'juan@gmail.com', bootcamp: 'Developer'}
        },
        404: {
            description: 'Estudiante no encontrado',
            schema: { error: 'El estudiante con el id = 1, no existe.' }
        },
        500: {
            description: 'Error interno del servidor.',
            schema: { error: 'Mensaje de error específico' }
        }
    }
    */
    eliminarEstudiante(req, res);
});

// Validar que no haya subrutas para un POST
router.post('*path', (req: Request, res: Response, next: NextFunction) => {
    validarErrorPath(req, res, next);
});

export default router;