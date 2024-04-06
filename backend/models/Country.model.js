var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Country extends Model {}

Country.init({
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
    modelName: 'countries',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Country