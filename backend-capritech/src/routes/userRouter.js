const express = require('express');
const router = express.Router();
// const { validateToken } = require('../middlewares/handlerToken');

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');


/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */


/**
 * @swagger
 * /api/user/usersAll:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados en el sistema
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
router.get('/',  getAllUsers);


/**
 * @swagger
 * /api/user/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id',  getUserById);

/**
 * @swagger
 * /api/user/users:
 *   post:
 *     summary: Crear usuario
 *     tags:
 *       - Usuarios
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post('/',  createUser);

/**
 * @swagger
 * /api/user/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 */
router.put('/:id',  updateUser);


/**
 * @swagger
 * /api/user/users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */
router.delete('/:id', deleteUser);

module.exports = router;
 