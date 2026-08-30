const {
    responsibleCreate,
    getAllResponsible: getAllResponsibleService,
    getIdResponsible,
    updateResponsible: updateResponsibleService,
    deleteIdResponsible
} = require('../services/responsibleService');
const Response = require("../functions/response");

const getAllResponsibles = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;
        const result = await getAllResponsibleService(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };
        
        var response = new Response(true, "Responsables consultados exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todos los responsables", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const getResponsibleById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al consultar el responsable", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const responsible = await getIdResponsible(id);
        if (!responsible) {
            var response = new Response(false, "Responsable no encontrado", null, [
                { mensaje: "No se encontro un responsable con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Responsable consultado exitosamente", responsible, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta del responsable", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const createResponsible = async (req, res) => {
    try {
        const { nombre, documento, tipoResponsable, actividad, frecuencia,  } = req.body;

        var errores = [];

        if (!nombre || String(nombre).trim() === "") {
            errores.push({ mensaje: "El nombre es obligatorio" });
        }
        if (!documento || String(documento).trim() === "") {
            errores.push({ mensaje: "El documento es obligatorio" });
        }
        if (!tipoResponsable || String(tipoResponsable).trim() === "") {
            errores.push({ mensaje: "El tipo de responsable es obligatorio" });
        }
        if (!actividad || String(actividad).trim() === "") {
            errores.push({ mensaje: "La actividad es obligatoria" });
        }
        if (!frecuencia || String(frecuencia).trim() === "") {
            errores.push({ mensaje: "La frecuencia es obligatoria" });
        }

        if (errores.length > 0) {
            var response = new Response(false, "Error en la creacion del responsable", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            nombre: nombre,
            documento: parseInt(documento),
            tipoResponsable: tipoResponsable,
            actividad: actividad,
            frecuencia: frecuencia,
        };

        console.log("Datos a guardar RESPONSIBLE:", data);
        const responsible = await responsibleCreate(data);
        var response = new Response(true, "Responsable creado exitosamente", responsible, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de responsable", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const updateResponsible = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar el responsable", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const responsible = await updateResponsibleService(id, data);
        var response = new Response(true, "Responsable actualizado exitosamente", responsible, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion de responsable", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteResponsible = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar el responsable", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const responsible = await deleteIdResponsible(id);
        if (responsible === 0) {
            var response = new Response(false, "Responsable no encontrado", null, [
                { mensaje: "No se encontro un responsable con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Responsable eliminado exitosamente", { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar responsable", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllResponsibles,
    getResponsibleById,
    createResponsible,
    updateResponsible,
    deleteResponsible
};