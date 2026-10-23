const db = require('../config/conectionDB');
const {DataTypes} = require('sequelize');

const Mating = db.define('Mating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaMonta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    numeroMonta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chapetaMacho: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chapetaHembra: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    posibleFechaParto: {
        type: DataTypes.DATE,
        allowNull: false
    },
    responsable: {             
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'mounts'
});

module.exports = Mating;