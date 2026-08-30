const Famacha = require('../models/famachaModel');

const famachaCreate = async (data) => {
    try {
        console.log("Datos recibidos en servicio FAMACHA:", data);
        const newfamacha = await Famacha.create(data);
        console.log("FAMACHA creado:", newfamacha.toJSON());
        return newfamacha;
    } catch (error) {
        console.log("Error en famachaCreate:", error);
        throw error;
    }
};

const getallfamacha = async (limit, offset) => {
    try {
        const totalCount = await Famacha.count();
        const famachaRecords = await Famacha.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });
        
        console.log("Registros FAMACHA encontrados:", famachaRecords.length);

        return {
            data: famachaRecords || [],
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    } catch (error) {
        console.log("Error en getallfamacha:", error);
        throw new Error(`Error al obtener registros FAMACHA: ${error.message}`);
    }
};

const getIdfamacha = async (id) => {
    try {
        const famachaRecord = await Famacha.findByPk(id);
        return famachaRecord || null;
    } catch (error) {
        console.log("Error en getIdfamacha:", error);
        throw new Error(`Error al obtener registro FAMACHA por ID: ${error.message}`);
    }
};

const deleteIdfamacha = async (id) => {
    try {
        const deletedfamacha = await Famacha.destroy({ where: { id: id } });
        return deletedfamacha;
    } catch (error) {
        console.log("Error en deleteIdfamacha:", error);
        throw new Error(`Error al eliminar registro FAMACHA: ${error.message}`);
    }
};

const updatefamacha = async (id, data) => {
    try {
        const updatedfamacha = await Famacha.update(data, { where: { id: id } });
        return updatedfamacha;
    } catch (error) {
        console.log("Error en updatefamacha:", error);
        throw new Error(`Error al actualizar registro FAMACHA: ${error.message}`);
    }
};

module.exports = {
    famachaCreate,
    getallfamacha,
    getIdfamacha,
    deleteIdfamacha,
    updatefamacha
};