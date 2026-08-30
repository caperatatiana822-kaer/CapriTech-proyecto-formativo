import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const AppRoute = sequelize.define('AppRoute', {
    id_app_Route: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_app_Route'
    },
    path: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING(70),
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

export default AppRoute;