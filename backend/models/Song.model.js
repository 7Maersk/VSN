var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Song extends Model {}

Song.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    position: {
        type: DataTypes.STRING,
        allowNull: true
    },

    record_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'songs',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Song 