const db = require('../config/conectionDB');
const { DataTypes } = require('sequelize');

const livestock = db.define('livestock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chapeta: {
    type: DataTypes.STRING,
    allowNull: false
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    etapaProduccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
});

module.exports = livestock;