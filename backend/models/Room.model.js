var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Room extends Model { }

Room.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    modelName: 'rooms',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Room 