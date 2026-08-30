const livestock = require('../models/livestockModel'); 

const livestockCreate = async (data) => {
    try {
        console.log("Datos recibidos en el servicio:", data);
        const newLivestock = await livestock.create(data);
        console.log("Registro creado:", newLivestock);
        return newLivestock;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getAllLivestock = async (limit, offset) => {
    try {
        const totalCount = await livestock.count();
        const allLivestock = await livestock.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']] 
        });
        
        return {
            data: allLivestock,
            pagination: {
                totalItems: totalCount,
                itemsPerPage: limit,
                currentPage: Math.floor(offset / limit) + 1,
                totalPages: Math.ceil(totalCount / limit)
            }
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const livestockGetById = async (id) => {
    try {
        const livestockId = await livestock.findOne({ where: { id } });
        return livestockId;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const livestockDelete = async (id) => {
    try {
        const deleted = await livestock.destroy({ where: { id } });
        return deleted;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const livestockUpdate = async (id, data) => {
    try {
        const updated = await livestock.update(data, { where: { id } });
        return updated;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    livestockCreate,
    getAllLivestock,
    livestockGetById,
    livestockDelete,
    livestockUpdate
};
