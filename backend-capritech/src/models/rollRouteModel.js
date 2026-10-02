const {DataTypes} = require('sequelize');
const db = require('../config/conectionDB');

const appRouteRoll = db.define('appRouteRoll', {
    id_appRouteRoll: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_appRoute: {
        type: DataTypes.INTEGER, 
    },
    id_roll: {
        type: DataTypes.INTEGER, 
    }
    
});
module.exports = appRouteRoll;