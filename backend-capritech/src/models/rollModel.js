import { DataTypes } from 'sequelize';
import { sequelize } from '../config/conectionDB';
const roll = sequelize.define('roll', {
    id_roll: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
    },
    slug: {
        type: DataTypes.STRING,
        max: 45,
    },
    name_rol: {

    },
    id_app_router: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_app_router'
    },
    is_psante: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_superadmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_gestor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_instructor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    abreviacion: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    fec_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'fec_creacion'
    },
    fec_actual: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'fec_actual'
    },
    id_rol_route : {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_rol_route'
    },
}, {
    tableName: 'roll',
    timestamps: false,
    createdAt: 'fec_creacion',
    updatedAt: 'fec_actual'
});

module.exports = roll;