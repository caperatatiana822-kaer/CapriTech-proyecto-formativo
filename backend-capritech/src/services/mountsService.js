const Mounts = require('../models/mountsModel');

const mountCreate = async (data) => {
    try {
        const newMount = await Mounts.create(data);
        return newMount;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getAllMounts = async (limit, offset) => {
    try {
        const totalCount = await Mounts.count();
        const allMounts = await Mounts.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });

        return {
            data: allMounts,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Math.floor(offset / limit) + 1
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const mountGetById = async (id) => {
    try {
        const Mountid = await Mounts.findOne({where: {id}});
        return Mountid;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const mountDelete = async (id) => {
    try {
        const deleteMount = await Mounts.destroy({where: {id}});
        return deleteMount;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const mountUpdate = async (id, data) => {
    try {
        const updateMount = await Mounts.update(data, {where: {id}}); 
        return updateMount;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    mountCreate,
    getAllMounts,
    mountGetById,
    mountDelete,
    mountUpdate
};