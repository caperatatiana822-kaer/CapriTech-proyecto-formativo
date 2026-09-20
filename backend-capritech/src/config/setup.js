const {createRoll, createRoutes, createRolRoute} = require("../services/setupAppService");

async function setup(){
    try{
        await createRoll();
        await createRoutes();
        await createRolRoute();
        console.log("Datos iniciales creados correctamente.");
    } catch (error){
        console.error("Error al crear datos iniciales:", error);
    }
}