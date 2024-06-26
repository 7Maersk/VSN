var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')
const Role = require('./Role.model')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    login: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = User 