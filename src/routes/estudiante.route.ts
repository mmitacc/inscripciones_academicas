import { Router } from 'express';
import { getQueryEstudiantes, getIdEstudiante, newEstudiante, actualizarTodoEstudiante, actualizarAlgunDatoEstudiante, eliminarEstudiante } from '../controllers/estudiante.controller.js';

const router: Router = Router();

// Endpoint para retornar la lista completa de estudiantes
router.get('/', getQueryEstudiantes);

// Endpoint retorna al estudiante con el ID especificado
router.get('/:id', getIdEstudiante);

// Endpoint para guardar a un estudiante nuevo
router.post('/', newEstudiante);

// Endpoint para actualización de todos los datos del estudiante por su ID
router.put('/:id', actualizarTodoEstudiante);

// Endpoint para actualización de algun data del estudiante por su ID
router.patch('/:id', actualizarAlgunDatoEstudiante);

// Endpoint para eliminar un estudiante por su ID
router.delete('/:id', eliminarEstudiante);

export default router;