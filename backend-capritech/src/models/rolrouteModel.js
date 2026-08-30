// models/RolRoute.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const RolRoute = sequelize.define('RolRoute', {
    id_rol_route: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_rol_route'
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_rol'
    },
    id_app_route: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_app_route'
    }
}, {
    tableName: 'rol_route',
    timestamps: false
});

export default RolRoute;