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
    const {
        chapeta,
        nombreAnimal,
        fechaNacimiento,
        raza,
        sexo,
        pesoNacer,
        fichaMadre,
        fichaPadre
    } = req.body;

    let errores = [];

    if (!chapeta) errores.push({ mensaje: "La chapeta es obligatoria" });
    if (!nombreAnimal) errores.push({ mensaje: "El nombre del animal es obligatorio" });
    if (!fechaNacimiento) errores.push({ mensaje: "La fecha de nacimiento es obligatoria" });
    if (!raza) errores.push({ mensaje: "La raza es obligatoria" });
    if (!sexo) errores.push({ mensaje: "El sexo es obligatorio" });
    if (!pesoNacer) errores.push({ mensaje: "El peso al nacer es obligatorio" });
    if (!fichaMadre) errores.push({ mensaje: "La ficha de la madre es obligatoria" });
    if (!fichaPadre) errores.push({ mensaje: "La ficha del padre es obligatoria" });

    if (errores.length > 0) {
        const response = new Response(false, "Error en la creacion del nacimiento", null, errores);
        res.status(400);
        res.json(response.json);
        return;
    }

    data = {
        chapeta: parseInt(chapeta),
        nombre: nombreAnimal,
        fechaNacimiento: fechaNacimiento,
        raza: raza,
        sexo: sexo,
        pesoNacimiento: parseFloat(pesoNacer),
        chapetaMadre: parseInt(fichaMadre),
        chapetaPadre: parseInt(fichaPadre)
    };
    
    const births = await birthsCreate(data);
    var response = new Response(true, "Nacimiento creado exitosamente", births, null);
    res.status(201);
    res.json(response.json);
} catch (error) {
    console.log(error);
    var response = new Response(false, "error en la creacion de nacimiento", null, [
        error.message,
    ])
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