const {
    mortalityCreate,
    getAllMortality: getAllMortalityService,
    getIdMortality,
    updateMortality: updateMortalityService,
    deleteIdMortality
} = require('../services/mortalityService');
const Response = require("../functions/response");

const getAllMortality = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllMortalityService(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };
        
        var response = new Response(true, "Mortalidades consultadas exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todas las mortalidades", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const getMortalityById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al consultar la mortalidad", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mortality = await getIdMortality(id);
        if (!mortality) {
            var response = new Response(false, "Mortalidad no encontrada", null, [
                { mensaje: "No se encontro una mortalidad con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Mortalidad consultada exitosamente", mortality, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta de la mortalidad", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const createMortality = async (req, res) => {
    try {
        const { fecha, chapeta, diagnosticopresuntivo } = req.body;

        var errores = [];

        if (!fecha || String(fecha).trim() === "") {
            errores.push({ mensaje: "La fecha es obligatoria" });
        }
        if (!chapeta || String(chapeta).trim() === "") {
            errores.push({ mensaje: "La chapeta es obligatoria" });
        }
        if (!diagnosticopresuntivo || String(diagnosticopresuntivo).trim() === "") {
            errores.push({ mensaje: "El diagnostico presuntivo es obligatorio" });
        }

        if (errores.length > 0) {
            var response = new Response(false, "Error en la creacion de la mortalidad", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            fecha: fecha,
            chapeta: parseInt(chapeta),
            diagnosticopresuntivo: diagnosticopresuntivo
        };

        console.log("Datos a guardar MORTALITY:", data);
        const mortality = await mortalityCreate(data);
        var response = new Response(true, "Mortalidad creada exitosamente", mortality, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de mortalidad", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const updateMortality = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar la mortalidad", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mortality = await updateMortalityService(id, data);
        var response = new Response(true, "Mortalidad actualizada exitosamente", mortality, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion de mortalidad", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteMortality = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar la mortalidad", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mortality = await deleteIdMortality(id);
        if (mortality === 0) {
            var response = new Response(false, "Mortalidad no encontrada", null, [
                { mensaje: "No se encontro una mortalidad con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Mortalidad eliminada exitosamente", { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar mortalidad", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllMortality,
    getMortalityById,
    createMortality,
    updateMortality,
    deleteMortality
};