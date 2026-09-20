import { DataTypes } from 'sequelize';
import { sequelize } from '../config/conectionDB';

const AppRoute = sequelize.define('AppRoute', {
    id_app_Route: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    path: {
        type: DataTypes.STRING,
        max: 255,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        max: 45,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
    icon: {
        type: DataTypes.STRING,
        max: 45,
        allowNull: true
    },
    group: {
        type: DataTypes.STRING(70),
        allowNull: true
    },
    module: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'app_route',
    timestamps: false
});
module.exports = AppRoute;