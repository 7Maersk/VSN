var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class UserCollection extends Model {}

UserCollection.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    record_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    is_fav: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    modelName: 'user_collection',
    tableName: 'user_collection',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = UserCollection