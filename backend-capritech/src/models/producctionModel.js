const db = require('../config/conectionDB');
const {DataTypes} = require('sequelize');

const Production = db.define('Production', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productionType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcionElemento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unidadMedida: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    valorUnitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    centroCosto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreTraslada: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreRecibe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructorTecnico: {
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
    timestamps: false,
    tableName: 'production'
});

module.exports = Production;