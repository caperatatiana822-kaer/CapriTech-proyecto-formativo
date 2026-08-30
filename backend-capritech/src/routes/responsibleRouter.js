const express = require('express');
const router = express.Router();
const {getAllResponsibles,
    getResponsibleById,
    createResponsible,
    updateResponsible,
    deleteResponsible} = require("../controllers/responsibleController.js"); 
// const { validateToken } = require('../middlewares/handlerToken.js');   

/**
 * @swagger
 * tags:
 *   name: Responsable
 *   description: Gestión de responsables
 */

/**
 * @swagger
 * /api/responsible/responsibleAll:
 *   get:
 *     summary: Obtener todos los responsables
 *     description: Devuelve una lista de todos los responsables registrados en el sistema
 *     tags:
 *       - Responsable
 *     responses:
 *       200:
 *         description: Lista de responsables obtenida correctamente
 */
router.get("/responsibleAll", getAllResponsibles)
/**
 * @swagger
 * /api/responsible/responsible/{id}:
 *   get:
 *     summary: Obtener un responsable por ID
 *     tags:
 *       - Responsable
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Responsable obtenido correctamente
 *       404:
 *         description: Responsable no encontrado
 */
router.get("/responsible/:id", getResponsibleById)
/**
 * @swagger
 * /api/responsible/responsible:
 *   post:
 *     summary: Crear registro de responsable
 *     tags:
 *       - Responsable
 *     responses:
 *       201:
 *         description: Registro de responsable creado correctamente
 */
router.post("/responsible", createResponsible)
/**
 * @swagger
 * /api/responsible/responsible/{id}:
 *   put:
 *     summary: Actualizar registro de responsable
 *     tags:
 *       - Responsable
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de responsable
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de responsable actualizado correctamente
 *       404:
 *         description: Registro de responsable no encontrado
 */
router.put("/responsible/:id",  updateResponsible)
/**
 * @swagger
 * /api/responsible/responsible/{id}:
 *   delete:
 *     summary: Eliminar registro de responsable
 *     tags:
 *       - Responsable
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de responsable
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de responsable eliminado correctamente
 *       404:
 *         description: Registro de responsable no encontrado
 */
router.delete("/responsible/:id", deleteResponsible)

module.exports = router;