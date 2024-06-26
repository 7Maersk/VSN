var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Record extends Model {}

Record.init({
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

    katalog_number: {
        type: DataTypes.STRING,
        allowNull: true
    },

    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },

    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cover: {
        type: DataTypes.STRING,
        allowNull: false
    },

    rating: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
}, {
    modelName: 'record',
    tableName: 'record',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Record 