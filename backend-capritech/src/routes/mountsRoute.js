const express = require('express'); 
const router = express.Router();
const {getAllMounts, 
    getMountById, 
    createMount, 
    updateMount, 
    deleteMount} = require("../controllers/mountsController.js");
// const { validateToken } = require('../middlewares/handlerToken.js');

/**
 * @swagger
 * tags:
 *   name: Montas
 *   description: Gestión de montas
 */

/**
 * @swagger
 * /api/mounts/mountsAll:
 *   get:
 *     summary: Obtener todas las montas
 *     description: Devuelve una lista de todas las montas registradas en el sistema
 *     tags:
 *       - Montas
 *     responses:
 *       200:
 *         description: Lista de montas obtenida correctamente
 */

/** */
router.get("/mountsAll", getAllMounts)   

/**
 * @swagger
 * /api/mounts/mounts/{id}:
 *   get:
 *     summary: Obtener una monta por ID
 *     tags:
 *       - Montas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la monta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Monta obtenida correctamente
 *       404:
 *         description: Monta no encontrada
 */
router.get("/mounts/:id",  getMountById)

/**
 * @swagger
 * /api/mounts/mounts:
 *   post:
 *     summary: Crear monta
 *     tags:
 *       - Montas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mount'
 *     responses:
 *       201:
 *         description: Monta creada correctamente
 */
router.post("/mounts",  createMount)

/**
 * @swagger
 * /api/mounts/mounts/{id}:
 *   put:
 *     summary: Actualizar una monta por ID
 *     tags:
 *       - Montas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la monta
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mount'
 *     responses:
 *       200:
 *         description: Monta actualizada correctamente
 *       404:
 *         description: Monta no encontrada
 */
router.put("/mounts/:id",  updateMount)
/**
 * @swagger
 * /api/mounts/mounts/{id}:
 *   delete:
 *     summary: Eliminar una monta por ID
 *     tags:
 *       - Montas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la monta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Monta eliminada correctamente
 *       404:
 *         description: Monta no encontrada
 */
router.delete("/mounts/:id",  deleteMount)

module.exports = router;
