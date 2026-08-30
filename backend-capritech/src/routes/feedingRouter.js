const express = require('express');
const router = express.Router();

const {getAllFeeding,
    getFeedingById,
    createFeeding,
    updateFeeding,
    deleteFeeding} = require("../controllers/feedingController.js");  
// const { validateToken } = require('../middlewares/handlerToken.js');
/**
 * @swagger
 * tags:
 *   name: Alimentación
 *   description: Gestión de alimentación
 */

/**
 * @swagger
 * /api/feeding/feedingsAll:
 *   get:
 *     summary: Obtener todos los registros de alimentación
 *     description: Devuelve una lista de todos los registros de alimentación registrados en el sistema
 *     tags:
 *       - Alimentación
 *     responses:
 *       200:
 *         description: Lista de registros de alimentación obtenida correctamente
 */
router.get("/feedingsAll",  getAllFeeding)
//alimentacion con id
/**
 * @swagger
 * /api/feeding/feedings/{id}:
 *   get:
 *     summary: Obtener un registro de alimentación por ID
 *     tags:
 *       - Alimentación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de alimentación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de alimentación obtenido correctamente
 *       404:
 *         description: Registro de alimentación no encontrado
 */
router.get("/feedings/:id",  getFeedingById)
//crear alimentacion
/**
 * @swagger
 * /api/feeding/feedings:
 *   post:
 *     summary: Crear registro de alimentación
 *     tags:
 *       - Alimentación
 *     responses:
 *       201:
 *         description: Registro de alimentación creado correctamente
 */
router.post("/feedings",  createFeeding)
//consultar alimentacion con id 
/**
 * @swagger
 * /api/feeding/feedings/{id}:
 *   put:
 *     summary: Actualizar registro de alimentación
 *     tags:
 *       - Alimentación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de alimentación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de alimentación actualizado correctamente
 *       404:
 *         description: Registro de alimentación no encontrado
 */
router.put("/feedings/:id",  updateFeeding)
//eliminar alimentacion
/**
 * @swagger
 * /api/feeding/feedings/{id}:
 *   delete:
 *     summary: Eliminar registro de alimentación
 *     tags:
 *       - Alimentación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de alimentación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de alimentación eliminado correctamente
 *       404:
 *         description: Registro de alimentación no encontrado
 */
router.delete("/feedings/:id",  deleteFeeding)

module.exports = router;