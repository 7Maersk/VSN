var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    record_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    modelName: 'comments',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Comment 