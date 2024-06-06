var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Message extends Model { }

Message.init({
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

    img: {
        type: DataTypes.STRING,
        allowNull: true
    },

    room_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    datetime: {
        type: DataTypes.DATE,
        allowNull: true
    },

}, {
    modelName: 'message',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Message 