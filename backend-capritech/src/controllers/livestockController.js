const { livestockCreate, livestockGetById, livestockUpdate, livestockDelete, getAllLivestock: getAllLivestockService } = require('../services/livestockService');
const Response = require("../functions/response");

const getAllLivestock = async (req, res) => {
    try {
        const queryLimit = req.query.limit;
        const queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0;

        const result = await getAllLivestockService(limit, offset);
        const responseData = {
            data: result.data,
            pagination: result.pagination
        };
        
        var response = new Response(true, "Semovientes consultados exitosamente", responseData, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.log(error);
        var response = new Response(false, "error al consultar todos los semovientes", null, [
            error.message,
        ])
        res.status(500);
        res.json(response.json);
    }
}

const getLivestockById = async(req, res) => {
    try {
    const {id} = req.params;
    var errores = [];
    if(!id){
        errores.push({mensaje: "El ID es obligatorio"});
    }
    if(id == ""){
        errores.push({mensaje: "El ID no puede estar vacío"});
    }
    if(errores.length > 0){
        var response = new Response(false, "Error al consultar el semoviente", null, errores);
        res.status(400);
        res.json(response.json);
        return;
    }
    const livestock = await livestockGetById(id);
    var response = new Response(true, "Semoviente consultado exitosamente", livestock, null);
    res.status(200);
    res.json(response.json);
} catch (error) {
    console.log(error);
    var response = new Response(false, "error en la consulta de semoviente", null, [
        error.message,
    ])
    res.status(500);
    res.json(response.json);
    }
};

const createLivestock = async(req, res) => {
    try {
    const {chapeta, raza, nombre, fechaNacimiento, sexo, etapaProduccion, observaciones} = req.body;
    var errores = [];
    if(!chapeta || !raza || !nombre || !fechaNacimiento || !sexo || !etapaProduccion || !observaciones){
        errores.push({mensaje: "Todos los campos son obligatorios"});
    }
    if(chapeta == ""){
        errores.push({mensaje: "El campo chapeta no puede estar vacio"});
    }
    if(raza == ""){
        errores.push({mensaje: "El campo raza no puede estar vacio"});
    }
    if(nombre == ""){
        errores.push({mensaje: "El campo nombre no puede estar vacio"});
    }
    if(fechaNacimiento == ""){
        errores.push({mensaje: "El campo fechaNacimiento no puede estar vacio"});
    }
    if(sexo == ""){
        errores.push({mensaje: "El campo sexo no puede estar vacio"});
    }
    if(etapaProduccion == ""){
        errores.push({mensaje: "El campo etapaProduccion no puede estar vacio"});
    }
    if(observaciones == ""){
        errores.push({mensaje: "El campo observaciones no puede estar vacio"});
    }
    if(errores.length > 0){
        var response = new Response(false, "Error en la creación del semoviente", null, errores);
        res.status(400);
        res.json(response.json);
        return;
    }
    data = {chapeta, raza, nombre, fechaNacimiento, sexo, etapaProduccion, observaciones};
    const livestock = await livestockCreate(data);
    var response = new Response(true, "Semoviente creado exitosamente", livestock, null);
    res.status(201);
    res.json(response.json);
} catch (error) {
    console.log(error);
    var response = new Response(false, "error en la creacion de semoviente", null, [
        error.message,
    ])
    res.status(500);
    res.json(response.json);
    }
};

const updateLivestock = async(req, res) => {
    try {
    const {id} = req.params;
    var errores = [];
    if(!id){
        errores.push({mensaje: "El ID es obligatorio"});
    }
    if(id == ""){
        errores.push({mensaje: "El ID no puede estar vacío"});
    }
    if(errores.length > 0){
        var response = new Response(false, "Error al actualizar el semoviente", null, errores);
        res.status(400);
        res.json(response.json);
        return;
    }
    const livestock = await livestockUpdate(id);
    var response = new Response(true, "Semoviente actualizado exitosamente", livestock, null);
    res.status(200);
    res.json(response.json);
} catch (error) {
    console.log(error);
    var response = new Response(false, "error en la actualizacion de semoviente", null, [
        error.message,
    ])
    res.status(500);
    res.json(response.json);
    }
};

const deleteLivestock = async(req, res) => {
    try {
    const {id} = req.params;
    var errores = [];
    if(!id){
        errores.push({mensaje: "El ID es obligatorio"});
    }
    if(id == ""){
        errores.push({mensaje: "El ID no puede estar vacío"});
    }
    if(errores.length > 0){
        var response = new Response(false, "Error al eliminar el semoviente", null, errores);
        res.status(400);
        res.json(response.json);
        return;
    }
    const livestock = await livestockDelete(id);
    var response = new Response(true, "Semoviente eliminado exitosamente", livestock, null);
    res.status(200);
    res.json(response.json);
} catch (error) {
    throw error;
    }
};

module.exports = {
    getAllLivestock,
    getLivestockById,
    createLivestock,
    updateLivestock,
    deleteLivestock
};