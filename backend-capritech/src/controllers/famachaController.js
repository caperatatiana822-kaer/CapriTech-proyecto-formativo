const {
    famachaCreate,
    getallfamacha: getAllFamachaService,
    getIdfamacha,
    updatefamacha,
    deleteIdfamacha
} = require('../services/famachaService');
const Response = require("../functions/response");

const getAllFamacha = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllFamachaService(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };
        
        var response = new Response(true, "Evaluaciones Famacha consultadas exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todas las evaluaciones Famacha", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const getFamachaById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio para obtener una evaluacion Famacha" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al obtener la evaluacion Famacha", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const famacha = await getIdfamacha(id);
        if (!famacha) {
            var response = new Response(false, "Evaluacion Famacha no encontrada", null, [
                { mensaje: "No se encontro una evaluacion Famacha con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Evaluacion Famacha consultada exitosamente", famacha, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta de la evaluacion Famacha", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const createFamacha = async (req, res) => {
    try {
        const { chapeta, responsable, resultado, observaciones } = req.body;
        const errores = [];

        if (!chapeta || String(chapeta).trim() === "") {
            errores.push({ mensaje: "La chapeta es obligatoria" });
        }
        if (!responsable || String(responsable).trim() === "") {
            errores.push({ mensaje: "El responsable es obligatorio" });
        }
        if (!resultado || String(resultado).trim() === "") {
            errores.push({ mensaje: "El resultado es obligatorio" });
        }

        if (errores.length > 0) {
            const response = new Response(false, "Faltan datos para crear la evaluacion Famacha", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        // Observaciones es opcional, si no viene se pone null
        const data = {
            chapeta: parseInt(chapeta),
            responsable: responsable,
            resultado: resultado,
            observaciones: observaciones || null
        };

        console.log("Datos a guardar FAMACHA:", data);
        const famacha = await famachaCreate(data);
        var response = new Response(true, "Evaluacion Famacha creada exitosamente", famacha, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de la evaluacion Famacha", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const updateFamacha = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio para actualizar una evaluacion Famacha" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar la evaluacion Famacha", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const famacha = await updatefamacha(id, data);
        var response = new Response(true, "Evaluacion Famacha actualizada exitosamente", famacha, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion de la evaluacion Famacha", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteFamacha = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio para eliminar una evaluacion Famacha" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar la evaluacion Famacha", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const famacha = await deleteIdfamacha(id);
        if (famacha === 0) {
            var response = new Response(false, "Evaluacion Famacha no encontrada", null, [
                { mensaje: "No se encontro una evaluacion Famacha con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Evaluacion Famacha eliminada exitosamente", { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar la evaluacion Famacha", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllFamacha,
    getFamachaById,
    createFamacha,
    updateFamacha,
    deleteFamacha
};