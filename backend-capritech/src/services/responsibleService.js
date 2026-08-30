const Responsible = require('../models/responsibleModel');

const responsibleCreate = async (data) => {
    try {
        console.log("Datos recibidos en servicio RESPONSIBLE:", data);
        const newResponsible = await Responsible.create(data);
        console.log("Responsable creado:", newResponsible.toJSON());
        return newResponsible;
    } catch (error) {
        console.log("Error en responsibleCreate:", error);
        throw error;
    }
};

const getAllResponsible = async (limit, offset) => {
    try {
        const totalCount = await Responsible.count();
        const responsibleRecords = await Responsible.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });
        
        console.log("Registros RESPONSIBLE encontrados:", responsibleRecords.length);
        return {
            data: responsibleRecords || [],
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    } catch (error) {
        console.log("Error en getAllResponsible:", error);
        throw new Error(`Error al obtener registros RESPONSIBLE: ${error.message}`);
    }
};

const getIdResponsible = async (id) => {
    try {
        const responsibleRecord = await Responsible.findByPk(id);
        return responsibleRecord || null;
    } catch (error) {
        console.log("Error en getIdResponsible:", error);
        throw new Error(`Error al obtener registro RESPONSIBLE por ID: ${error.message}`);
    }
};

const deleteIdResponsible = async (id) => {
    try {
        const deletedResponsible = await Responsible.destroy({ where: { id: id } });
        return deletedResponsible;
    } catch (error) {
        console.log("Error en deleteIdResponsible:", error);
        throw new Error(`Error al eliminar registro RESPONSIBLE: ${error.message}`);
    }
};

const updateResponsible = async (id, data) => {
    try {
        const updatedResponsible = await Responsible.update(data, { where: { id: id } });
        return updatedResponsible;
    } catch (error) {
        console.log("Error en updateResponsible:", error);
        throw new Error(`Error al actualizar registro RESPONSIBLE: ${error.message}`);
    }
};

module.exports = {
    responsibleCreate,
    getAllResponsible,
    getIdResponsible,
    deleteIdResponsible,
    updateResponsible
};