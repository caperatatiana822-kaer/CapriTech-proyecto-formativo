const Feeding = require('../models/feedingModel');

const feedingCreate = async (data) => {
    try {
        console.log("Datos recibidos en servicio FEEDING:", data);
        const newFeeding = await Feeding.create(data);
        console.log("Alimentacion creada:", newFeeding.toJSON());
        return newFeeding;
    } catch (error) {
        console.log("Error en feedingCreate:", error);
        throw error;
    }
};

const getAllFeeding = async (limit, offset) => {
    try {
        const totalCount = await Feeding.count();
        const feedingRecords = await Feeding.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });
        
        console.log("Registros FEEDING encontrados:", feedingRecords.length);
        return {
            data: feedingRecords || [],
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    } catch (error) {
        console.log("Error en getAllFeeding:", error);
        throw new Error(`Error al obtener registros FEEDING: ${error.message}`);
    }
};

const getIdFeeding = async (id) => {
    try {
        const feedingRecord = await Feeding.findByPk(id);
        return feedingRecord || null;
    } catch (error) {
        console.log("Error en getIdFeeding:", error);
        throw new Error(`Error al obtener registro FEEDING por ID: ${error.message}`);
    }
};

const deleteIdFeeding = async (id) => {
    try {
        const deleteFeeding = await Feeding.destroy({ where: { id: id } });
        return deleteFeeding;
    } catch (error) {
        console.log("Error en deleteIdFeeding:", error);
        throw new Error(`Error al eliminar registro FEEDING: ${error.message}`);
    }
};

const updateFeeding = async (id, data) => {
    try {
        const updateFeeding = await Feeding.update(data, { where: { id: id } });
        return updateFeeding;
    } catch (error) {
        console.log("Error en updateFeeding:", error);
        throw new Error(`Error al actualizar registro FEEDING: ${error.message}`);
    }
};

module.exports = {
    feedingCreate,
    getAllFeeding,
    getIdFeeding,
    deleteIdFeeding,
    updateFeeding
};