const { mountCreate, mountDelete, mountUpdate, mountGetById, getAllMounts: getAllMountsService } = require("../services/mountsService");
const Response = require("../functions/response");

const getAllMounts = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllMountsService(limit, offset);
        const responseData = {
            data: result.data,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        };
        
        var response = new Response(true, "Montas consultadas exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todas las montas", null, [
            error.message,
        ])
        res.status(500);
        res.json(response.json);
    }
}

const getMountById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim() === "") {
            const response = new Response(false, "error al obtener la monta", null, "El ID es obligatorio para obtener una monta");
            return res.status(400).json(response.json);
        }
        const mount = await mountGetById(id);
        var response = new Response(true, "monta consultada exitosamente", mount, null);
        res.status(200);
        res.json(response.json)
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la consulta de monta", null, [
            error.message,
        ])
        res.status(500);
        res.json(response.json);
    }
};

const createMount = async (req, res) => {
    try {
        const { fechaMonta, numeroMonta, nombreMacho, razaMacho, chapetaMacho, nombreHembra, razaHembra, chapetaHembra, posibleFechaParto } = req.body;
        var errores = [];
        if (!fechaMonta || fechaMonta.trim() === "") {
            errores.push({ mensaje: "La fecha de la monta es obligatoria" });
        }
        if (!numeroMonta || numeroMonta == "") {
            errores.push({ mensaje: "El número de la monta es obligatorio" });
        }
        if (!nombreMacho || nombreMacho.trim() === "") {
            errores.push({ mensaje: "El nombre del macho es obligatorio" });
        }
        if (!razaMacho || razaMacho.trim() === "") {
            errores.push({ mensaje: "La raza del macho es obligatoria" });
        }
        if (!chapetaMacho || chapetaMacho == "") {
            errores.push({ mensaje: "La chapeta del macho es obligatoria" });
        }
        if (!nombreHembra || nombreHembra.trim() === "") {
            errores.push({ mensaje: "El nombre de la hembra es obligatorio" });
        }
        if (!razaHembra || razaHembra.trim() === "") {
            errores.push({ mensaje: "La raza de la hembra es obligatoria" });
        }
        if (!chapetaHembra || chapetaHembra == "") {
            errores.push({ mensaje: "La chapeta de la hembra es obligatoria" });
        }
        if (!posibleFechaParto || posibleFechaParto.trim() === "") {
            errores.push({ mensaje: "La posible fecha de parto es obligatoria" });
        }
        if (errores.length > 0) {
            var response = new Response(false, "Error en la creación de la monta", null, errores);
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { fechaMonta, numeroMonta, nombreMacho, razaMacho, chapetaMacho, nombreHembra, razaHembra, chapetaHembra, posibleFechaParto };
        const mount = await mountCreate(data);
        var response = new Response(true, "Monta creada exitosamente", mount, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error en la creacion de monta", null, [
            error.message,
        ])
        res.status(500);
        res.json(response.json);
    }
};

const updateMount = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id || id.trim() === "") {
            const response = new Response(false, "error al actualizar la monta", null, "El ID es obligatorio para actualizar una monta");
            return res.status(400).json(response.json);
        }
        const mount = await mountUpdate(id, data);
        var response = new Response(true, "monta actualizada exitosamente", mount, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al actualizar la monta", null, [
            error.message,
        ]);
        res.status(500);
        res.json(response.json);
    }
};

const deleteMount = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim() === "") {
            const response = new Response(false, "error al eliminar la monta", null, "El ID es obligatorio para eliminar una monta");
            return res.status(400).json(response.json);
        }
        const mount = await mountDelete(id);
        var response = new Response(true, "monta eliminada exitosamente", mount, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllMounts,
    getMountById,
    createMount,
    updateMount,
    deleteMount
};