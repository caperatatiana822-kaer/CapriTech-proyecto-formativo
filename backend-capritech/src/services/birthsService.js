const Birth = require('../models/birthsModel');

const birthsCreate = async (data) => {
    try {
        console.log("Datos recibidos en servicio:", data);
        const newBirth = await Birth.create(data);
        console.log("Nacimiento creado:", newBirth.toJSON());
        return newBirth;
    } catch (error) {
        console.log("Error en birthsCreate:", error);
        throw error;
    }
};

const getAllbirths = async (limit, offset) => {
    try {
        const allBirths = await Birth.findAll({limit: limit, offset: offset});
        console.log("Nacimientos encontrados:", allBirths.length);
        return allBirths || [];
    } catch (error) {
        console.log("Error en getAllbirths:", error);
        throw new Error(`Error al obtener nacimientos: ${error.message}`);
    }
};

const getIdbirths = async (id) => {
    try {
        const birthid = await Birth.findOne({ where: { id } });
        return birthid || null;
    } catch (error) {
        console.log("Error en getIdbirths:", error);
        throw new Error(`Error al obtener nacimiento por ID: ${error.message}`);
    }
};

const deleteIdbirths = async (id) => {
    try {
        const deleteBirth = await Birth.destroy({ where: { id } });
        return deleteBirth;
    } catch (error) {
        console.log("Error en deleteIdbirths:", error);
        throw new Error(`Error al eliminar nacimiento: ${error.message}`);
    }
};

const updatebirths = async (id, data) => {
    try {
        const updateBirth = await Birth.update(data, { where: { id } });
        return updateBirth;
    } catch (error) {
        console.log("Error en updatebirths:", error);
        throw new Error(`Error al actualizar nacimiento: ${error.message}`);
    }
};

module.exports = {
    birthsCreate,
    getAllbirths,
    getIdbirths,
    deleteIdbirths,
    updatebirths
};