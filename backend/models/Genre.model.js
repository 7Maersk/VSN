var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Genre extends Model {}

Genre.init({
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
    modelName: 'genres',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Genre