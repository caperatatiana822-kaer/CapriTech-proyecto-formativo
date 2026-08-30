const express = require('express');
const router = express.Router();
const{getAllProduction,
    getProductionById,
    createProduction,
    updateProduction,
    deleteProduction} = require("../controllers/productionController.js")
// const { validateToken } = require('../middlewares/handlerToken');

/**
 * @swagger
 * tags:
 *   name: Producción
 *   description: Gestión de producción
 */

/**
 * @swagger
 * /api/production/productionAll:
 *   get:
 *     summary: Obtener toda la producción
 *     description: Devuelve una lista de toda la producción registrada en el sistema
 *     tags:
 *       - Producción
 *     responses:
 *       200:
 *         description: Lista de producción obtenida correctamente
 */
router.get("/productionAll",  getAllProduction)


/**
 * @swagger
 * /api/production/production/{id}:
 *   get:
 *     summary: Obtener la producción por ID
 *     tags:
 *       - Producción
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la producción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producción obtenida correctamente
 *       404:
 *         description: Producción no encontrada
 */
router.get("/production/:id", getProductionById)

/**
 * @swagger
 * /api/production/production:
 *   post:
 *     summary: Crear producción
 *     tags:
 *       - Producción
 *     responses:
 *       201:
 *         description: Producción creada correctamente
 */
router.post("/production", createProduction)

/**
 * @swagger
 * /api/production/production/{id}:
 *   put:
 *     summary: Actualizar producción
 *     tags:
 *       - Producción
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la producción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producción actualizada correctamente
 *       404:
 *         description: Producción no encontrada
 */
router.put("/production/:id", updateProduction)

/**
 * @swagger
 * /api/production/production/{id}:
 *   delete:
 *     summary: Eliminar producción
 *     tags:
 *       - Producción
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la producción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producción eliminada correctamente
 *       404:
 *         description: Producción no encontrada
 */
router.delete("/production/:id", deleteProduction)

module.exports = router;