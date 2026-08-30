const db = require('../config/conectionDB');
const { DataTypes } = require('sequelize');

const Responsible = db.define('Responsible', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipoResponsable: {
        type: DataTypes.STRING,
        allowNull: false
    },
    actividad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    frecuencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'responsibles',
    timestamps: true
});

module.exports = Responsible;