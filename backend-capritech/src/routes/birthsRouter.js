const express = require ('express');
const router = express.Router();
const {getAllBirths,
    getBirthsById,
    createBirths,
    updateBirths,
    deleteBirths} = require("../controllers/birthsController.js");
// const { validateToken } = require('../middlewares/handlerToken.js');

/**
 * @swagger
 * tags:
 *   name: Nacimientos
 *   description: Gestión de nacimientos
 */

/**
 * @swagger
 * /api/births/birthsAll:
 *   get:
 *     summary: Obtener todos los nacimientos
 *     description: Devuelve una lista de todos los nacimientos registrados en el sistema
 *     tags:
 *       - Nacimientos
 *     responses:
 *       200:
 *         description: Lista de nacimientos obtenida correctamente
 */
router.get("/birthsAll", getAllBirths)

//ruta para nacimientos con id 

/**
 * @swagger
 * /api/births/births/{id}:
 *   get:
 *     summary: Obtener un nacimiento por ID
 *     tags:
 *       - Nacimientos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del nacimiento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nacimiento obtenido correctamente
 *       404:
 *         description: Nacimiento no encontrado
 */
router.get("/births/:id", getBirthsById)

//crear nacimiento
/**
 * @swagger
 * /api/births/births:
 *   post:
 *     summary: Crear nacimiento
 *     tags:
 *       - Nacimientos
 *     responses:
 *       201:
 *         description: Nacimiento creado correctamente
 */
router.post("/births",  createBirths)

//actualizar nacimiento
/**
 * @swagger
 * /api/births/births/{id}:
 *   put:
 *     summary: Actualizar nacimiento
 *     tags:
 *       - Nacimientos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del nacimiento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nacimiento actualizado correctamente
 *       404:
 *         description: Nacimiento no encontrado
 */
router.put("/births/:id", updateBirths)

//eliminar nacimiento
/**
 * @swagger
 * /api/births/births/{id}:
 *   delete:
 *     summary: Eliminar nacimiento
 *     tags:
 *       - Nacimientos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del nacimiento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nacimiento eliminado correctamente
 *       404:
 *         description: Nacimiento no encontrado
 */
router.delete("/births/:id", deleteBirths)

module.exports = router;


