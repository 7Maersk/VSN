var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class RecordGenre extends Model {}

RecordGenre.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    record_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'record_genre',
    tableName: 'record_genre',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = RecordGenre