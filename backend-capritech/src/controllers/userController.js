const {
    createUserService,
    getAllUsers: getAllUsersService,
    getUserById: getUserByIdService,
    userUpdate: serviceUpdateUser,
    deleteIdUsers: deleteUserService
} = require("../services/userService");

const Response = require("../functions/response");
const path = require("path");
const fs = require("fs");
const { sendEmail } = require("../services/emailService");
const bcrypt = require("bcrypt");


const getAllUsers = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const result = await getAllUsersService(limit, offset);

        return res.status(200).json({
            success: true,
            message: "Usuarios encontrados",
            data: result.data,
            pagination: {
                page: result.currentPage,
                limit: limit,
                total: result.totalItems,
                totalPages: result.totalPages
            },
            error: null
        });

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);

        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            data: null,
            error: error.message
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getUserByIdService(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                data: null,
                error: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Registro encontrado",
            data: user,
            error: null
        });

    } catch (error) {
        console.error("Error al obtener el usuario:", error);

        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            data: null,
            error: error.message
        });
    }
};


const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            documento,
            postJob,
            verifyEmail,
            active
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !documento ||
            !postJob
        ) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios",
                data: null,
                error: null
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const data = {
            name,
            email,
            password: hashedPassword,
            salt,
            documento,
            postJob,
            verifyEmail: verifyEmail ?? false,
            active: active ?? false
        };

        const newUser = await createUserService(data);

        return res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            data: newUser,
            error: null
        });

    } catch (error) {
        console.error("Error al crear el usuario:", error);

        return res.status(500).json({
            success: false,
            message: "Error al crear el usuario",
            data: null,
            error: error.message
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            email,
            password,
            documento,
            postJob,
            verifyEmail,
            active
        } = req.body;

        const dataToValidate = {
            name,
            email,
            documentId: documento,
            postJob,
            verifyEmail: typeof verifyEmail === "boolean" ? verifyEmail : false,
            active: typeof active === "boolean" ? active : true
        };

        if (password && password.trim() !== "") {
            const salt = bcrypt.genSaltSync(10);
            dataToValidate.password = bcrypt.hashSync(password, salt);
        }

        const resultado = await serviceUpdateUser(id, dataToValidate);

        var response = new Response(true, "Usuario actualizado correctamente", resultado);
        return res.status(200).json(response);

    } catch (error) {
        console.error("Error al actualizar el usuario:", error);

        var response = new Response(false, "Error al actualizar el usuario", [
            error.message
        ]);
        return res.status(500).json(response);
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await deleteUserService(id);

        if (deleted === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                data: null,
                error: null
            });
        }

        return res.status(200).json({
            success: true,
            message: `Usuario con ID ${id} eliminado correctamente`,
            data: null,
            error: null
        });

    } catch (error) {
        console.error("Error al eliminar el usuario:", error);

        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            data: null,
            error: error.message
        });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};