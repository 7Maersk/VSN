var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class PostType extends Model {}

PostType.init({
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
    modelName: 'post_type',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    sequelize: sequelize
})

module.exports = PostType 