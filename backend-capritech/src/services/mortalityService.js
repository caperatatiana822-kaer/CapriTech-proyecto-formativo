const Mortality = require('../models/mortalityModel');

const mortalityCreate = async (data) => {
    try {
        console.log("Datos recibidos en servicio MORTALITY:", data);
        const newMortality = await Mortality.create(data);
        console.log("Mortalidad creada:", newMortality.toJSON());
        return newMortality;
    } catch (error) {
        console.log("Error en mortalityCreate:", error);
        throw error;
    }
};

const getAllMortality = async (limit, offset) => {
    try {

        const totalCount = await Mortality.count();
        const mortalityRecords = await Mortality.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });
        
        console.log("Registros MORTALITY encontrados:", mortalityRecords.length);
        return {
            data: mortalityRecords || [],
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    } catch (error) {
        console.log("Error en getAllMortality:", error);
        throw new Error(`Error al obtener registros MORTALITY: ${error.message}`);
    }
};

const getIdMortality = async (id) => {
    try {
        const mortalityRecord = await Mortality.findByPk(id);
        return mortalityRecord || null;
    } catch (error) {
        console.log("Error en getIdMortality:", error);
        throw new Error(`Error al obtener registro MORTALITY por ID: ${error.message}`);
    }
};

const deleteIdMortality = async (id) => {
    try {
        const deletedMortality = await Mortality.destroy({ where: { id: id } });
        return deletedMortality;
    } catch (error) {
        console.log("Error en deleteIdMortality:", error);
        throw new Error(`Error al eliminar registro MORTALITY: ${error.message}`);
    }
};

const updateMortality = async (id, data) => {
    try {
        const updatedMortality = await Mortality.update(data, { where: { id: id } });
        return updatedMortality;
    } catch (error) {
        console.log("Error en updateMortality:", error);
        throw new Error(`Error al actualizar registro MORTALITY: ${error.message}`);
    }
};

module.exports = {
    mortalityCreate,
    getAllMortality,
    getIdMortality,
    deleteIdMortality,
    updateMortality
};