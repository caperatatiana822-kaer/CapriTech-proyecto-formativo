const roll = require('../models/rolLModel');
const appRoute = require('../models/approuteModel');
const rolRoute = require('../models/rollRouteModel');
const {DEFAULT_ROLL, DEFAULT_ROL_APP_ROUTES, DEFAULT_APP_ROUTES} = require("../config/DB-setup");

const createRoll = async (data) => {
    try {
        for (const rollData of DEFAULT_ROLL) {
            await roll.create(rollData);
        }
    } catch (error) {
        throw error;
    }
};

const createRoutes = async () => {
    try {
        for (const routeData of DEFAULT_APP_ROUTES){
            await appRoute.create(routeData);
        }
    }catch (error) {
        throw error;
    }
};

const createRolRoute = async () => {
    try {
        for (const rolRouteData of DEFAULT_ROL_APP_ROUTES){
            await rolRoute.create(rolRouteData);
        }
    }catch (error) {
        throw error;
    }
};

module.exports = {
    createRoll,
    createRoutes,
    createRolRoute
};