const express = require('express');
const router = express.Router();
const{getAllVaccination, 
    getVaccinationById,
    createVaccination,
    updateVaccination,
    deleteVaccination} = require("../controllers/vaccinationController.js");  
// const { validateToken } = require('../middlewares/handlerToken.js'); 
        
/**
 * @swagger
 * tags:
 *   name: Vacunación
 *   description: Gestión de vacunación
 */

/**
 * @swagger
 * /api/vaccination/vaccinationAll:
 *   get:
 *     summary: Obtener todos los registros de vacunación
 *     description: Devuelve una lista de todos los registros de vacunación registrados en el sistema
 *     tags:
 *       - Vacunación
 *     responses:
 *       200:
 *         description: Lista de registros de vacunación obtenida correctamente
 */
router.get("/vaccinationAll",  getAllVaccination)

/**
 * @swagger
 * /api/vaccination/vaccination/{id}:
 *   get:
 *     summary: Obtener un registro de vacunación por ID
 *     tags:
 *       - Vacunación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de vacunación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de vacunación obtenido correctamente
 *       404:
 *         description: Registro de vacunación no encontrado
 */
router.get("/vaccination/:id", getVaccinationById)

/**
 * @swagger
 * /api/vaccination/vaccination:
 *   post:
 *     summary: Crear registro de vacunación
 *     tags:
 *       - Vacunación
 *     responses:
 *       201:
 *         description: Registro de vacunación creado correctamente
 */
router.post("/vaccination", createVaccination)

/**
 * @swagger
 * /api/vaccination/vaccination/{id}:
 *   put:
 *     summary: Actualizar registro de vacunación
 *     tags:
 *       - Vacunación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de vacunación
 *         schema:
 *           type: string
 *     responses:
 *       200:
*         description: Registro de vacunación actualizado correctamente
*       404:
*         description: Registro de vacunación no encontrado
 */
router.put("/vaccination/:id",  updateVaccination)

/**
* @swagger
* /api/vaccination/vaccination/{id}:
*   delete:
*     summary: Eliminar registro de vacunación
*     tags:
*       - Vacunación
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID del registro de vacunación
*         schema:
*           type: string
*     responses:
*       200:
*         description: Registro de vacunación eliminado correctamente
*       404:
*         description: Registro de vacunación no encontrado
 */
router.delete("/vaccination/:id", deleteVaccination)

module.exports = router;