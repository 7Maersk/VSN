var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class RecordArtist extends Model {}

RecordArtist.init({
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
    
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'record_artist',
    tableName: 'record_artist',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = RecordArtist 