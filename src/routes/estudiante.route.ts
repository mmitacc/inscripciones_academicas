import { Router } from 'express';
import { getQueryEstudiantes, getIdEstudiante, newEstudiante, actualizarTodoEstudiante, actualizarAlgunDatoEstudiante, eliminarEstudiante } from '../controllers/estudiante.controller.js';
import { validarIsEmptyDb, validarId, validarErrorPath } from '../middlewares/validarId.middleware.js';

const router: Router = Router();

// Endpoint para retornar querys o la lista completa de estudiantes
router.get('/', validarIsEmptyDb, getQueryEstudiantes);

// Endpoint retorna al estudiante con el ID especificado
router.get('/:id', validarIsEmptyDb, validarId, getIdEstudiante);

// Endpoint para guardar a un estudiante nuevo
router.post('/', newEstudiante);

// Endpoint para actualización de todos los datos del estudiante por su ID
router.put('/:id', validarIsEmptyDb, validarId, actualizarTodoEstudiante);

// Endpoint para actualización de algun data del estudiante por su ID
router.patch('/:id', validarIsEmptyDb, validarId, actualizarAlgunDatoEstudiante);

// Endpoint para eliminar un estudiante por su ID
router.delete('/:id', validarIsEmptyDb, validarId, eliminarEstudiante);

// Validar que no haya subrutas para un POST
router.post('*path', validarErrorPath);

export default router;