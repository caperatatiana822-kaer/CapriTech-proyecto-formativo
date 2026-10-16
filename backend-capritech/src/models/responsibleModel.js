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
        type: DataTypes.STRING(255),
        allowNull: false
    },
    frecuencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    diaSemana: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'responsibles',
    timestamps: false
});

module.exports = Responsible;