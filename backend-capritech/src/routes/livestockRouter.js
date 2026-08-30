const express = require('express');
const router = express.Router();
const {getAllLivestock, 
    getLivestockById, 
    createLivestock, 
    updateLivestock, 
    deleteLivestock} = require("../controllers/livestockController.js");

// const { validateToken } = require('../middlewares/handlerToken');
/**
 * @swagger
 * tags:
 *   name: Semovientes
 *   description: Gestión de semovientes
 */


/**
 * @swagger
 * /api/livestock/livestockAll:
 *   get:
 *     summary: Obtener todos los semovientes
 *     description: Devuelve una lista de todos los semovientes registrados en el sistema
 *     tags:
 *       - Semovientes
 *     responses:
 *       200:
 *         description: Lista de semovientes obtenida correctamente
 */
router.get("/livestockAll", getAllLivestock)

/**
 * @swagger
 * /api/livestock/livestock/{id}:
 *   get:
 *     summary: Obtener un semoviente por ID
 *     tags:
 *       - Semovientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del semoviente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Semoviente obtenido correctamente
 *       404:
 *         description: Semoviente no encontrado
 */
//semoviente con id
router.get("/livestock/:id",  getLivestockById)

/**
 * @swagger
 * /api/livestock/livestock:
 *   post:
 *     summary: Crear semoviente
 *     tags:
 *       - Semovientes
 *     responses:
 *       201:
 *         description: Semoviente creado correctamente
 */
//crear semoviente
router.post("/livestock",  createLivestock)

/**
 * @swagger
 * /api/livestock/livestock/{id}:
 *   put:
 *     summary: Actualizar semoviente
 *     tags:
 *       - Semovientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del semoviente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Semoviente actualizado correctamente
 */
//consultar semoviente con id
router.put("/livestock/:id", updateLivestock)
/**
 * @swagger
 * /api/livestock/livestock/{id}:
 *   delete:
 *     summary: Eliminar semoviente
 *     tags:
 *       - Semovientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del semoviente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Semoviente eliminado correctamente
 */
//eliminar semoviente
router.delete("/livestock/:id",  deleteLivestock)

module.exports = router;