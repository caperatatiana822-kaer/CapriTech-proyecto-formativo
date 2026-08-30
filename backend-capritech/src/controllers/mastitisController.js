const {
    mastitisCreate,
    getAllMastitis: getAllMastitisService,
    getIdMastitis,
    updateMastitis: updateMastitisService,
    deleteIdMastitis
} = require('../services/mastitisService');
const Response = require("../functions/response");

const getAllMastitis = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;     
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllMastitisService(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };
        
        var response = new Response(true, "Casos de mastitis consultados exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todos los casos de mastitis", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const getMastitisById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al consultar el caso de mastitis", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mastitis = await getIdMastitis(id);
        if (!mastitis) {
            var response = new Response(false, "Caso de mastitis no encontrado", null, [
                { mensaje: "No se encontro un caso de mastitis con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Caso de mastitis consultado exitosamente", mastitis, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta del caso de mastitis", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const createMastitis = async (req, res) => {
    try {
        const { chapeta, fecha, resultado, responsable, observaciones } = req.body;

        var errores = [];

        if (!chapeta || String(chapeta).trim() === "") {
            errores.push({ mensaje: "La chapeta es obligatoria" });
        }
        if (!fecha || String(fecha).trim() === "") {
            errores.push({ mensaje: "La fecha es obligatoria" });
        }
        if (!resultado || String(resultado).trim() === "") {
            errores.push({ mensaje: "El resultado es obligatorio" });
        }
        if (!responsable || String(responsable).trim() === "") {
            errores.push({ mensaje: "El responsable es obligatorio" });
        }

        if (errores.length > 0) {
            var response = new Response(false, "Error en la creacion del caso de mastitis", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            chapeta: parseInt(chapeta),
            fecha: fecha,
            resultado: resultado,
            responsable: responsable,
            observaciones: observaciones || null
        };

        console.log("Datos a guardar MASTITIS:", data);
        const mastitis = await mastitisCreate(data);
        var response = new Response(true, "Caso de mastitis creado exitosamente", mastitis, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion del caso de mastitis", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const updateMastitis = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar el caso de mastitis", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mastitis = await updateMastitisService(id, data);
        var response = new Response(true, "Caso de mastitis actualizado exitosamente", mastitis, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion del caso de mastitis", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteMastitis = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar el caso de mastitis", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mastitis = await deleteIdMastitis(id);
        if (mastitis === 0) {
            var response = new Response(false, "Caso de mastitis no encontrado", null, [
                { mensaje: "No se encontro un caso de mastitis con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Caso de mastitis eliminado exitosamente", { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar el caso de mastitis", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllMastitis,
    getMastitisById,
    createMastitis,
    updateMastitis,
    deleteMastitis
};