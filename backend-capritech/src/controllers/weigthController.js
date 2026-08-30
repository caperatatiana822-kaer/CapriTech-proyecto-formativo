const {
    weigthCreate,
    getAllWeigthings,
    getIdWeigthing,
    updateWeigthing,
    deleteIdWeigthing
} = require('../services/weightService');
const Response = require("../functions/response");

const getAllWeigth = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllWeigthings(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };
        
        var response = new Response(true, "Pesajes consultados exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todos los pesajes", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const getWeigthById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al consultar el pesaje", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const weighing = await getIdWeigthing(id);
        if (!weighing) {
            var response = new Response(false, "Pesaje no encontrado", null, [
                { mensaje: "No se encontro un pesaje con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Pesaje consultado exitosamente", weighing, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta del pesaje", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const createWeigth = async (req, res) => {
    try {
        const { fechaPesaje, chapeta, peso, responsable } = req.body;

        var errores = [];

        if (!fechaPesaje || String(fechaPesaje).trim() === "") {
            errores.push({ mensaje: "La fecha de pesaje es obligatoria" });
        }
        if (!chapeta || String(chapeta).trim() === "") {
            errores.push({ mensaje: "La chapeta es obligatoria" });
        }
        if (!peso || String(peso).trim() === "") {
            errores.push({ mensaje: "El peso es obligatorio" });
        }
        if (!responsable || String(responsable).trim() === "") {
            errores.push({ mensaje: "El responsable es obligatorio" });
        }

        if (errores.length > 0) {
            var response = new Response(false, "Error en la creacion del pesaje", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            fechaPesaje: fechaPesaje,
            chapeta: parseInt(chapeta),
            peso: parseFloat(peso),
            responsable: responsable
        };

        console.log("Datos a guardar WEIGHT:", data);
        const weighing = await weigthCreate(data);
        var response = new Response(true, "Pesaje creado exitosamente", weighing, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de pesaje", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const updateWeigth = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar el pesaje", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const weighing = await updateWeigthing(id, data);
        var response = new Response(true, "Pesaje actualizado exitosamente", weighing, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion de pesaje", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteWeigth = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar el pesaje", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const weighing = await deleteIdWeigthing(id);
        if (weighing === 0) {
            var response = new Response(false, "Pesaje no encontrado", null, [
                { mensaje: "No se encontro un pesaje con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Pesaje eliminado exitosamente", { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar pesaje", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllWeigth,
    getWeigthById,
    createWeigth,
    updateWeigth,
    deleteWeigth
};