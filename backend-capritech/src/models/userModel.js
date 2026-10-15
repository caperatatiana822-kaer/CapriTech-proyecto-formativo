const db = require('../config/conectionDB');
const { DataTypes } = require('sequelize');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    salt: {
        type: DataTypes.STRING,
        max: 50,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        max: 200,
        min: 3,
        allowNull: false
    },
    documentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    postJob: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "false"
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    verifyEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;