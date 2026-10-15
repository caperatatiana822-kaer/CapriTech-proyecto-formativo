const db = require('../config/conectionDB');
const { DataTypes } = require('sequelize');

const Vaccination = db.define('Vaccination', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chapeta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    vacuna: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dosis: {
        type: DataTypes.STRING,
        allowNull: true
    },
    responsable: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'vaccination',
    timestamps: true
});

module.exports = Vaccination;