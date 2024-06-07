var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Ticket extends Model { }

Ticket.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, {
    modelName: 'tickets',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Ticket 