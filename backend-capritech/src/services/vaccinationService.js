const Vaccination = require('../models/vaccinationModel');

const createvaccination = async (data) => {
    try {
        console.log("Datos recibidos en servicio VACCINATION:", data);
        const newVaccination = await Vaccination.create(data);
        console.log("Vacunacion creada:", newVaccination.toJSON());
        return newVaccination;
    } catch (error) {
        console.log("Error en createvaccination:", error);
        throw error;
    }
};

const getAllvaccinations = async (limit, offset) => {
    try {
        const totalCount = await Vaccination.count();

        const vaccinationRecords = await Vaccination.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });
        
        console.log("Registros VACCINATION encontrados:", vaccinationRecords.length);
        return {
            data: vaccinationRecords || [],
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    } catch (error) {
        console.log("Error en getAllvaccinations:", error);
        throw new Error(`Error al obtener registros VACCINATION: ${error.message}`);
    }
};

const getIdvaccinations = async (id) => {
    try {
        const vaccinationid = await Vaccination.findByPk(id);
        return vaccinationid || null;
    } catch (error) {
        console.log("Error en getIdvaccinations:", error);
        throw new Error(`Error al obtener registro VACCINATION por ID: ${error.message}`);
    }
};

const deleteIdvaccinations = async (id) => {
    try {
        const deleteVaccination = await Vaccination.destroy({ where: { id: id } });
        return deleteVaccination;
    } catch (error) {
        console.log("Error en deleteIdvaccinations:", error);
        throw new Error(`Error al eliminar registro VACCINATION: ${error.message}`);
    }
};

const updatevaccinations = async (id, data) => {
    try {
        const updateVaccination = await Vaccination.update(data, { where: { id: id } });
        return updateVaccination;
    } catch (error) {
        console.log("Error en updatevaccinations:", error);
        throw new Error(`Error al actualizar registro VACCINATION: ${error.message}`);
    }
};

module.exports = {
    createvaccination,
    getAllvaccinations,
    getIdvaccinations,
    deleteIdvaccinations,
    updatevaccinations
};