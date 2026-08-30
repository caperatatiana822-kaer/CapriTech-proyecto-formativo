import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
const Roll = sequelize.define('Roll', {
    id_roll: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_Roll'
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

export default Roll;