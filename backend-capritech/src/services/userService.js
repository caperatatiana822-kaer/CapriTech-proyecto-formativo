const User = require('../models/userModel');

const userCreate = async (data) => {
    try {
        console.log("Datos recibidos en servicio USER:", data);
        const newUser = await User.create(data);
        console.log("Usuario creado:", newUser.toJSON());
        return newUser;
    } catch (error) {
        console.log("Error en userCreate:", error);
        throw error;
    }
};

const getAllUsers = async (limit, offset) => {
    try {
        const totalCount = await User.count();
        const users = await User.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });
        
        console.log("Registros USER encontrados:", users.length);
        return {
            data: users || [],
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    } catch (error) {
        console.log("Error en getAllUsers:", error);
        throw new Error(`Error al obtener registros USER: ${error.message}`);
    }
};

const userGetById = async (id) => {
    try {
        const userid = await User.findByPk(id);
        return userid || null;
    } catch (error) {
        console.log("Error en userGetById:", error);
        throw new Error(`Error al obtener registro USER por ID: ${error.message}`);
    }
};

const usuarioDelete = async (id) => {
    try {
        const deleteUser = await User.destroy({ where: { id: id } });
        return deleteUser;
    } catch (error) {
        console.log("Error en usuarioDelete:", error);
        throw new Error(`Error al eliminar registro USER: ${error.message}`);
    }
};

const userUpdate = async (id, data) => {
    try {
        const updateUser = await User.update(data, { where: { id: id } });
        return updateUser;
    } catch (error) {
        console.log("Error en userUpdate:", error);
        throw new Error(`Error al actualizar registro USER: ${error.message}`);
    }
};

module.exports = {
    userCreate,
    getAllUsers,
    userGetById,
    usuarioDelete,
    userUpdate
};