const express = require('express');
const router = express.Router();
const {getAllFamacha, 
    getFamachaById, 
    createFamacha, 
    updateFamacha, 
    deleteFamacha} = require("../controllers/famachaController.js");
// const { validateToken } = require('../middlewares/handlerToken.js');

//ruta para famacha
/**
 * @swagger
 * tags:
 *   name: Famacha
 *   description: Gestión de famacha
 */

/**
 * @swagger
 * /api/famacha/famachaAll:
 *   get:
 *     summary: Obtener todos los registros de famacha
 *     description: Devuelve una lista de todos los registros de famacha registrados en el sistema
 *     tags:
 *       - Famacha
 *     responses:
 *       200:
 *         description: Lista de registros de famacha obtenida correctamente
 */
router.get("/famachaAll", getAllFamacha)

//ruta para famacha con id
/**
 * @swagger
 * /api/famacha/famacha/{id}:
 *   get:
 *     summary: Obtener un registro de famacha por ID
 *     tags:
 *       - Famacha
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de famacha
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de famacha obtenido correctamente
 *       404:
 *         description: Registro de famacha no encontrado
 */
router.get("/famacha/:id", getFamachaById)

//crear famacha
/**
 * @swagger
 * /api/famacha/famacha:
 *   post:
 *     summary: Crear registro de famacha
 *     tags:
 *       - Famacha
 *     responses:
 *       201:
 *         description: Registro de famacha creado correctamente
 */
router.post("/famacha", createFamacha)
//actualizar famacha
/**
 * @swagger
 * /api/famacha/famacha/{id}:
 *   put:
 *     summary: Actualizar registro de famacha
 *     tags:
 *       - Famacha
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de famacha
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de famacha actualizado correctamente
 *       404:
 *         description: Registro de famacha no encontrado
 */
router.put("/famacha/:id",  updateFamacha)
//eliminar famacha
/**
 * @swagger
 * /api/famacha/famacha/{id}:
 *   delete:
 *     summary: Eliminar registro de famacha
 *     tags:
 *       - Famacha
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de famacha
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de famacha eliminado correctamente
 *       404:
 *         description: Registro de famacha no encontrado
 */
router.delete("/famacha/:id", deleteFamacha)

module.exports = router;
