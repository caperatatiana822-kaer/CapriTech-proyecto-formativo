const { 
    userCreate, 
    userGetById, 
    usuarioDelete, 
    userUpdate, 
    getAllUsers: getAllUsersService 
} = require('../services/userService');
const Response = require("../functions/response");
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset; 
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllUsersService(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };
        
        var response = new Response(true, "Usuarios consultados exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todos los usuarios", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al consultar el usuario", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const user = await userGetById(id);
        if (!user) {
            var response = new Response(false, "Usuario no encontrado", null, [
                { mensaje: "No se encontro un usuario con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Usuario consultado exitosamente", user, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta de usuario", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, documentId, postJob } = req.body;

        var errores = [];

        if (!name || String(name).trim() === "") {
            errores.push({ mensaje: "El nombre es obligatorio" });
        }
        if (!email || String(email).trim() === "") {
            errores.push({ mensaje: "El email es obligatorio" });
        }
        if (!password || String(password).trim() === "") {
            errores.push({ mensaje: "La contraseña es obligatoria" });
        }
        if (!documentId || String(documentId).trim() === "") {
            errores.push({ mensaje: "El documento es obligatorio" });
        }
        if (!postJob || String(postJob).trim() === "") {
            errores.push({ mensaje: "El cargo es obligatorio" });
        }

        if (errores.length > 0) {
            var response = new Response(false, "Error en la creacion del usuario", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        const salt =bcrypt.genSaltSync(10);
        const hashed_password = bcrypt.hashSync(password, salt)

        const data = {
            name: name,
            email: email,
            password: hashed_password,
            salt, 
            documentId: documentId,
            postJob: postJob,
            verifyEmail: false,
            active: false
        };

        console.log("Datos a guardar USER:", data);
        const user = await userCreate(data);
        var response = new Response(true, "Usuario creado exitosamente", user, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de usuario", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar el usuario", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const user = await userUpdate(id, data);
        var response = new Response(true, "Usuario actualizado exitosamente", user, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion de usuario", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar el usuario", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const user = await usuarioDelete(id);
        if (user === 0) {
            var response = new Response(false, "Usuario no encontrado", null, [
                { mensaje: "No se encontro un usuario con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Usuario eliminado exitosamente", { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar usuario", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};