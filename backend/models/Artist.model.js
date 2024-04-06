var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Artist extends Model {}

Artist.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },

    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },

    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    modelName: 'artists',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Artist