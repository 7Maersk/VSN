var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')
const User = require('./User.model')

class ExtraArtist extends Model {}

ExtraArtist.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    song_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'extraartists',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = ExtraArtist 