const {
    createvaccination,
    getAllvaccinations: getAllVaccinationService,
    getIdvaccinations,
    updatevaccinations,
    deleteIdvaccinations
} = require("../services/vaccinationService");
const Response = require("../functions/response");

const getAllVaccination = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;

        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllVaccinationService(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };

        const response = new Response(true, "Vacunaciones consultadas exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        const response = new Response(false, "error al consultar todas las vacunaciones", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const getVaccinationById = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al consultar la vacunacion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const vaccination = await getIdvaccinations(id);
        if (!vaccination) {
            var response = new Response(false, "Vacunacion no encontrada", null, [
                { mensaje: "No se encontro una vacunacion con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Vacunacion consultada exitosamente", vaccination, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta de la vacunacion", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const createVaccination = async (req, res) => {
    try {
        const { chapeta, fecha, vacuna, dosis, responsable } = req.body;

        let errores = [];

        if (!chapeta || String(chapeta).trim() === "") {
            errores.push({ mensaje: "La chapeta es obligatoria" });
        }
        if (!fecha || String(fecha).trim() === "") {
            errores.push({ mensaje: "La fecha es obligatoria" });
        }
        if (!vacuna || String(vacuna).trim() === "") {
            errores.push({ mensaje: "El nombre de la vacuna es obligatorio" });
        }
         if (!dosis || String(dosis).trim() === "") {
            errores.push({ mensaje: "La dosis es obligatoria" });
        }
        if (!responsable || String(responsable).trim() === "") {
            errores.push({ mensaje: "El responsable es obligatorio" });
        }

        if (errores.length > 0) {
            const response = new Response(false, "Error en la creacion de la vacunacion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            chapeta: parseInt(chapeta),
            fecha: fecha,
            vacuna: vacuna,
            dosis: dosis,
            responsable: responsable
        };

        console.log("Datos a guardar VACCINATION:", data);
        const vaccination = await createvaccination(data);
        const response = new Response(true, "Vacunacion creada exitosamente", vaccination, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de vacunacion", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const updateVaccination = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al actualizar la vacunacion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const vaccination = await updatevaccinations(id, data);
        var response = new Response(true, "Vacunacion actualizada exitosamente", vaccination, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la actualizacion de vacunacion", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteVaccination = async (req, res) => {
    try {
        const { id } = req.params;
        var errores = [];
        if (!id || String(id).trim() === "") {
            errores.push({ mensaje: "El ID es obligatorio" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error al eliminar la vacunacion", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        const vaccination = await deleteIdvaccinations(id);
        if (vaccination === 0) {
            var response = new Response(false, "Vacunacion no encontrada", null, [
                { mensaje: "No se encontro una vacunacion con el ID proporcionado" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }
        var response = new Response(true, "Vacunacion eliminada exitosamente", { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al eliminar vacunacion", null, [error.message]);
        res.status(500);
        res.json(response.json);
    }
};

module.exports = {
    getAllVaccination,
    getVaccinationById,
    createVaccination,
    updateVaccination,
    deleteVaccination
};