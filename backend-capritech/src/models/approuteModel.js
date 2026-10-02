const {DataTypes} = require('sequelize');
const db = require('../config/conectionDB');

const appRoute = db.define('appRoute', {
    id_appRoute: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    name_router: {
        type: DataTypes.STRING,
        max: 45
    },
    route: {
        type: DataTypes.STRING,
        max: 255
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
    icono: {
        type: DataTypes.STRING,
        max: 45
    }
});
module.exports = appRoute;