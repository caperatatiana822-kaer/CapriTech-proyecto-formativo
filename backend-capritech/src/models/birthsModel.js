const db = require('../config/conectionDB');
const { DataTypes } = require('sequelize');

const Birth = db.define('Birth', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idMonta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaParto: {
        type: DataTypes.DATE,
        allowNull: false
    },
    razas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nacidosVivos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nacidosMuertos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    machos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hembras: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    responsable: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'births',
    timestamps: true
});

module.exports = Birth;