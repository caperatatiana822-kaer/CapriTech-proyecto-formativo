const Production = require('../models/producctionModel');

const productionCreate = async (data) => {
    try {
        const newProduction = await Production.create(data);
        return newProduction;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getAllProduction = async (limit, offset) => {
    try {
        const totalCount = await Production.count();
        const allProduction = await Production.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']] 
        });
        
        return {
            data: allProduction,
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

const productionGetById = async (id) => {
    try {
        const Productionid = await Production.findOne({where: {id}});
        return Productionid;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const productionDelete = async (id) => {
    try {
        const deleteProduction = await Production.destroy({where: {id}});
        return deleteProduction;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const productionUpdate = async (id, data) => {
    try {
        const updateProduction = await Production.update(data, {where: {id}}); 
        return updateProduction;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    productionCreate,
    getAllProduction,
    productionGetById,
    productionDelete,
    productionUpdate
};