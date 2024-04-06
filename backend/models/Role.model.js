var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')
const User = require('./User.model')

class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    modelName: 'roles',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Role 