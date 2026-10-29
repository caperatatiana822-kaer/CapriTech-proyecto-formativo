const {
    birthsCreate,
    getAllbirths: getAllBirthsService,
    getIdbirths,
    updatebirths,
    deleteIdbirths
} = require('../services/birthsService');
const Response = require("../functions/response");

const getAllBirths = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;
    
        const limit = queryLimit ? Number(queryLimit):10;
        const offset = queryOffset ? Number(queryOffset):0;

        const birthsList = await getAllBirthsService(limit, offset);
        const dataArray = Array.isArray(birthsList) ? birthsList : [];
        var response = new Response(true, "Nacimientos consultados exitosamente", dataArray, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todos los nacimientos", null, [
            error.message,
        ])
        res.status(500);
        res.json(response.json);
    }
};

const getBirthsById = async (req, res) => {
    try {
    const { id } = req.params;
    var errores = [];
    if (!id) {
        errores.push({ mensaje: "El ID es obligatorio" });
    }
    if (id == "") {
        errores.push({ mensaje: "El ID no puede estar vacio" });
    }
    if (errores.length > 0) {
        var response = new Response(false, "Error al consultar el nacimiento", null, errores);
        res.status(400);
        res.json(response.json);
        return;
    }
    const births = await getIdbirths(id);
    var response = new Response(true, "Nacimiento consultado exitosamente", births, null);
    res.status(200);
    res.json(response.json);
} catch (error) {
    console.log(error);
    var response = new Response(false, "error en la consulta de nacimiento", null, [
        error.message,
    ])
    res.status(500);
    res.json(response.json);
    }
};

const createBirths = async (req, res) => {
    try {
        const { idMonta, fechaParto, razas, nacidosVivos, nacidosMuertos, machos, hembras, responsable, active = true } = req.body;

        let errores = [];
        if (!idMonta) errores.push({ mensaje: "La monta es obligatoria" });
        if (!fechaParto) errores.push({ mensaje: "La fecha de parto es obligatoria" });
        if (!razas) errores.push({ mensaje: "La raza es obligatoria" });
        if (nacidosVivos === undefined) errores.push({ mensaje: "Los nacidos vivos son obligatorios" });
        if (nacidosMuertos === undefined) errores.push({ mensaje: "Los nacidos muertos son obligatorios" });
        if (machos === undefined) errores.push({ mensaje: "La cantidad de machos es obligatoria" });
        if (hembras === undefined) errores.push({ mensaje: "La cantidad de hembras es obligatoria" });
        if (!responsable) errores.push({ mensaje: "El responsable es obligatorio" });

        if (errores.length > 0) {
            const response = new Response(false, "Error en la creación del parto", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            idMonta: parseInt(idMonta),
            fechaParto,
            razas,
            nacidosVivos: parseInt(nacidosVivos),
            nacidosMuertos: parseInt(nacidosMuertos),
            machos: parseInt(machos),
            hembras: parseInt(hembras),
            responsable,
            active 
        };
        
        const births = await birthsCreate(data);
        var response = new Response(true, "Parto registrado exitosamente", births, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creación de parto", null, [error.message])
        res.status(500);
        res.json(response.json);
    }
};

const updateBirths = async (req, res) => {
    try {
    const { id } = req.params;
    const data = req.body;
    var errores = [];
    if (!id) {
        errores.push({ mensaje: "El ID es obligatorio" });
    }
    if (id == "") {
        errores.push({ mensaje: "El ID no puede estar vacio" });
    }
    if (errores.length > 0) {
        var response = new Response(false, "Error al actualizar el nacimiento", null, errores);
        res.status(400);
        res.json(response.json);
        return;
    }
    const births = await updatebirths(id, data);
    var response = new Response(true, "Nacimiento actualizado exitosamente", births, null);
    res.status(200);
    res.json(response.json);
} catch (error) {
    console.log(error);
    var response = new Response(false, "error en la actualizacion de nacimiento", null, [
        error.message,
    ])
    res.status(500);
    res.json(response.json);
    }
};

const deleteBirths = async (req, res) => {
    try {
    const { id } = req.params;
    var errores = [];
    if (!id) {
        errores.push({ mensaje: "El ID es obligatorio" });
    }
    if (id == "") {
        errores.push({ mensaje: "El ID no puede estar vacio" });
    }
    if (errores.length > 0) {
        var response = new Response(false, "Error al eliminar el nacimiento", null, errores);
        res.status(400);
        res.json(response.json);
        return;
    }
    const births = await deleteIdbirths(id);
    var response = new Response(true, "Nacimiento eliminado exitosamente", births, null);
    res.status(200);
    res.json(response.json);
} catch (error) {
    console.log(error);
    var response = new Response(false, "error al eliminar nacimiento", null, [error.message]);
    res.status(500);
    res.json(response.json);
    }
};

module.exports = {
    getAllBirths,
    getBirthsById,
    createBirths,
    updateBirths,
    deleteBirths
};