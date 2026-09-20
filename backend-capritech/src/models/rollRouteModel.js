// models/RolRoute.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/conectionDB';

const RolRoute = sequelize.define('RolRoute', {
    id_rol_route: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    id_rol: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,

    },
    id_app_route: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,

    }
}, {
    tableName: 'rol_route',
    timestamps: false
});

module.exports = RolRoute;