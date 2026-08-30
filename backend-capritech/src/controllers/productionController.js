const { productionCreate, getAllProduction: getAllProductionService, productionGetById, productionUpdate, productionDelete } = require('../services/productionService');
const Response = require("../functions/response");

const getAllProduction = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;

        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;
        const result = await getAllProductionService(limit, offset);
        const responseData = {
            data: result.data,
            pagination: result.pagination
        };

        var response = new Response(true, "Producción consultada exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar toda la producción", null, [
            error.message,
        ])
        res.status(500);
        res.json(response.json);
    }
}

const getProductionById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id) {
            errores.push({ message: "el id es obligatorio" })
        }
        if (id == "") {
            errores.push({ mensaje: "El ID no puede estar vacío" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al consultar la produccion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const production = await productionGetById(id);
        var response = new Response(true, "produccion consultada exitosamente", production, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar la producción", null, [error.message]);
        res.status(500);
        res.json(response.json);

    }
};

const createProduction = async (req, res) => {
    try {
        const { productionType, fecha, descripcionElemento, unidadMedida, cantidad, valorUnitario, valorTotal, fechaVencimiento, centroCosto, nombreTraslada, nombreRecibe, instructorTecnico, observaciones } = req.body;
        var errores = [];
        if (!productionType || !fecha || !descripcionElemento || !unidadMedida || !cantidad || !valorUnitario || !valorTotal || !fechaVencimiento || !centroCosto || !nombreTraslada || !nombreRecibe || !instructorTecnico || !observaciones) {
            errores.push({ mensaje: "Todos los campos son obligatorios" });
        }
        if (productionType == "") {
            errores.push({ mensaje: "El campo productionType no puede estar vacio" });
        }
        if (fecha == "") {
            errores.push({ mensaje: "El campo fecha no puede estar vacio" });
        }
        if (descripcionElemento == "") {
            errores.push({ mensaje: "El campo descripcion no puede estar vacio" });
        }
        if (unidadMedida == "") {
            errores.push({ mensaje: "El campo unidadMedida no puede estar vacio" });
        }
        if (cantidad == "") {
            errores.push({ mensaje: "El campo cantidad no puede estar vacio" });
        }
        if (valorUnitario == "") {
            errores.push({ mensaje: "El campo valorUnitario no puede estar vacio" });
        }
        if (valorTotal == "") {
            errores.push({ mensaje: "El campo valorTotal no puede estar vacio" });
        }
        if (fechaVencimiento == "") {
            errores.push({ mensaje: "El campo fechaVencimiento no puede estar vacio" });
        }
        if (nombreTraslada == "") {
            errores.push({ mensaje: "El campo nombreTraslada no puede estar vacio" });
        }
        if (nombreRecibe == "") {
            errores.push({ mensaje: "El campo nombreRecibe no puede estar vacio" });
        }
        if (instructorTecnico == "") {
            errores.push({ mensaje: "El campo instructorTecnico no puede estar vacio" });
        }
        if (observaciones == "") {
            errores.push({ mensaje: "El campo observaciones no puede estar vacio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error en la creación de la producción", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        data = { productionType, fecha, descripcionElemento, unidadMedida, cantidad, valorUnitario, valorTotal, fechaVencimiento, centroCosto, nombreTraslada, nombreRecibe, instructorTecnico, observaciones };
        const production = await productionCreate(data);
        var response = new Response(true, "Producción creada exitosamente", production, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de produccion", null, [
            error.message,
        ])
        res.status(500);
        res.json(response.json);
    }
};

const updateProduction = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id) {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (id == "") {
            errores.push({ mensaje: "El ID no puede estar vacío" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar la produccion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const production = await productionUpdate(id, data);
        var response = new Response(true, "produccion actualizada exitosamente", production, null);
        res.status(200);
        res.json(response.json)
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion de produccion", null, [
            error.message,
        ])
        res.status(500);
        res.json(response.json);
    }
};

const deleteProduction = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id) {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (id == "") {
            errores.push({ mensaje: "El ID no puede estar vacío" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar la produccion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const production = await productionDelete(id);
        var response = new Response(true, "Producción eliminada exitosamente", production, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar la producción", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllProduction,
    getProductionById,
    createProduction,
    updateProduction,
    deleteProduction
};