const Weighing = require('../models/weigthModel');

const weigthCreate = async (data) => {
    try {
        console.log("Datos recibidos en servicio WEIGHT:", data);
        const newWeighing = await Weighing.create(data);
        console.log("Pesaje creado:", newWeighing.toJSON());
        return newWeighing;
    } catch (error) {
        console.error("Error al crear pesaje:", error);
        throw error;
    }
};

const getAllWeigthings = async (limit, offset) => {
    try {
        const totalCount = await Weighing.count();
        const weighingRecords = await Weighing.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });
        
        console.log("Registros WEIGHT encontrados:", weighingRecords.length);
        return {
            data: weighingRecords || [],
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    } catch (error) {
        console.error("Error al consultar los pesajes:", error);
        throw new Error(`Error al obtener registros WEIGHT: ${error.message}`);
    }
};

const getIdWeigthing = async (id) => {
    try {
        const weighingRecord = await Weighing.findByPk(id);
        return weighingRecord || null;
    } catch (error) {
        console.error("Error al consultar el pesaje:", error);
        throw new Error(`Error al obtener registro WEIGHT por ID: ${error.message}`);
    }
};

const deleteIdWeigthing = async (id) => {
    try {
        const deletedWeighing = await Weighing.destroy({ where: { id: id } });
        return deletedWeighing;
    } catch (error) {
        console.error("Error al eliminar el pesaje:", error);
        throw new Error(`Error al eliminar registro WEIGHT: ${error.message}`);
    }
};

const updateWeigthing = async (id, data) => {
    try {
        const updatedWeighing = await Weighing.update(data, { where: { id: id } });
        return updatedWeighing;
    } catch (error) {
        console.error("Error al actualizar el pesaje:", error);
        throw new Error(`Error al actualizar registro WEIGHT: ${error.message}`);
    }
};

module.exports = {
    weigthCreate,
    getAllWeigthings,
    getIdWeigthing,
    deleteIdWeigthing,
    updateWeigthing
};