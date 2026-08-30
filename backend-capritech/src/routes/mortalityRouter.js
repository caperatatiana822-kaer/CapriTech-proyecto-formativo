const express = require('express');
const router = express.Router();
const {getAllMortality,
    getMortalityById,
    createMortality,
    updateMortality,
    deleteMortality} = require("../controllers/mortalityController.js");
    // const { validateToken } = require('../middlewares/handlerToken.js');

/**
 * @swagger
 * tags:
 *   name: Mortalidad
 *   description: Gestión de mortalidad
 */

/**
 * @swagger
 * /api/mortality/mortalityAll:
 *   get:
 *     summary: Obtener todos los registros de mortalidad
 *     description: Devuelve una lista de todos los registros de mortalidad registrados en el sistema
 *     tags:
 *       - Mortalidad
 *     responses:
 *       200:
 *         description: Lista de registros de mortalidad obtenida correctamente
 */
router.get("/mortalityAll", getAllMortality)
/**
 * @swagger
 * /api/mortality/mortality/{id}:
 *   get:
 *     summary: Obtener un registro de mortalidad por ID
 *     tags:
 *       - Mortalidad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de mortalidad
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de mortalidad obtenido correctamente
 *       404:
 *         description: Registro de mortalidad no encontrado
 */
router.get("/mortality/:id", getMortalityById)
/**
 * @swagger
 * /api/mortality/mortality:
 *   post:
 *     summary: Crear registro de mortalidad
 *     tags:
 *       - Mortalidad
 *     responses:
 *       201:
 *         description: Registro de mortalidad creado correctamente
 */
router.post("/mortality", createMortality)
/**
 * @swagger
 * /api/mortality/mortality/{id}:
 *   put:
 *     summary: Actualizar registro de mortalidad
 *     tags:
 *       - Mortalidad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de mortalidad
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de mortalidad actualizado correctamente
*       404:
*         description: Registro de mortalidad no encontrado
 */
router.put("/mortality/:id",  updateMortality)
/**
* @swagger
* /api/mortality/mortality/{id}:
*   delete:
*     summary: Eliminar registro de mortalidad
*     tags:
*       - Mortalidad
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID del registro de mortalidad
*         schema:
*           type: string
*     responses:
*       200:
*         description: Registro de mortalidad eliminado correctamente
*       404:
*         description: Registro de mortalidad no encontrado
 */
router.delete("/mortality/:id",  deleteMortality)

module.exports = router;