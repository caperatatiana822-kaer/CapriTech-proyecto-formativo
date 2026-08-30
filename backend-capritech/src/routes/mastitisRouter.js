const express = require ('express');
const router = express.Router();
const {getAllMastitis,
    getMastitisById,
    createMastitis,
    updateMastitis,
    deleteMastitis} = require("../controllers/mastitisController.js");
// const { validateToken } = require('../middlewares/handlerToken.js');  

/**
 * @swagger
 * tags:
 *   name: Mastitis
 *   description: Gestión de mastitis
 */

/**
 * @swagger
 * /api/mastitis/mastitisAll:
 *   get:
 *     summary: Obtener todos los registros de mastitis
 *     description: Devuelve una lista de todos los registros de mastitis registrados en el sistema
 *     tags:
 *       - Mastitis
 *     responses:
 *       200:
 *         description: Lista de registros de mastitis obtenida correctamente
 */
router.get("/mastitisAll", getAllMastitis)
/**
 * @swagger
 * /api/mastitis/mastitis/{id}:
 *   get:
 *     summary: Obtener un registro de mastitis por ID
 *     tags:
 *       - Mastitis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de mastitis
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de mastitis obtenido correctamente
 *       404:
 *         description: Registro de mastitis no encontrado
 */
router.get("/mastitis/:id", getMastitisById)
/**
 * @swagger
 * /api/mastitis/mastitis:
 *   post:
 *     summary: Crear registro de mastitis
 *     tags:
 *       - Mastitis
 *     responses:
 *       201:
 *         description: Registro de mastitis creado correctamente
 */
router.post("/mastitis", createMastitis)
/**
 * @swagger
 * /api/mastitis/mastitis/{id}:
 *   put:
 *     summary: Actualizar registro de mastitis
 *     tags:
 *       - Mastitis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de mastitis
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de mastitis actualizado correctamente
 *       404:
 *         description: Registro de mastitis no encontrado
 */
router.put("/mastitis/:id",  updateMastitis)
/**
 * @swagger
 * /api/mastitis/mastitis/{id}:
 *   delete:
 *     summary: Eliminar registro de mastitis
 *     tags:
 *       - Mastitis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de mastitis
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de mastitis eliminado correctamente
 *       404:
 *         description: Registro de mastitis no encontrado
 */
router.delete("/mastitis/:id",  deleteMastitis)

module.exports = router;