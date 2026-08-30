const {
    feedingCreate,
    getAllFeeding: getAllFeedingService,
    getIdFeeding,
    updateFeeding: updateFeedingService,
    deleteIdFeeding
} = require('../services/feedingService');
const Response = require("../functions/response");

const getAllFeeding = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;

        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllFeedingService(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };
        
        var response = new Response(true, "Alimentaciones consultadas exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todas las alimentaciones", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};
const getFeedingById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al consultar la alimentacion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const feeding = await getIdFeeding(id);
        if (!feeding) {
            var response = new Response(false, "Alimentacion no encontrada", null, [
                { mensaje: "No se encontro una alimentacion con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Alimentacion consultada exitosamente", feeding, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta de la alimentacion", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const createFeeding = async (req, res) => {
    try {
        const { fecha, responsable, alimento, cantidad } = req.body;

        var errores = [];

        if (!fecha || String(fecha).trim() === "") {
            errores.push({ mensaje: "La fecha es obligatoria" });
        }
        if (!responsable || String(responsable).trim() === "") {
            errores.push({ mensaje: "El responsable es obligatorio" });
        }
        if (!alimento || String(alimento).trim() === "") {
            errores.push({ mensaje: "El alimento es obligatorio" });
        }
        if (!cantidad || String(cantidad).trim() === "") {
            errores.push({ mensaje: "La cantidad es obligatoria" });
        }

        if (errores.length > 0) {
            var response = new Response(false, "Error en la creacion de la alimentacion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            fecha: fecha,
            responsable: responsable,
            alimento: alimento,
            cantidad: parseFloat(cantidad)
        };

        console.log("Datos a guardar FEEDING:", data);
        const feeding = await feedingCreate(data);
        var response = new Response(true, "Alimentacion creada exitosamente", feeding, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de alimentacion", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const updateFeeding = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio para actualizar" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar la alimentacion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const feeding = await updateFeedingService(id, data);
        var response = new Response(true, "Alimentacion actualizada exitosamente", feeding, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion de alimentacion", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteFeeding = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio para eliminar" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar la alimentacion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const feeding = await deleteIdFeeding(id);
        if (feeding === 0) {
            var response = new Response(false, "Alimentacion no encontrada", null, [
                { mensaje: "No se encontro una alimentacion con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Alimentacion eliminada exitosamente", { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar alimentacion", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllFeeding,
    getFeedingById,
    createFeeding,
    updateFeeding,
    deleteFeeding
};