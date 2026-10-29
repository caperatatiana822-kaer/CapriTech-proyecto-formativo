const db = require('../config/conectionDB');
const { DataTypes } = require('sequelize');

const Weighing = db.define('Weighing', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaPesaje: {
        type: DataTypes.DATE,
        allowNull: false
    },
    chapeta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(10,2),
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
    tableName: 'weigth',
    timestamps: true
});

module.exports = Weighing;