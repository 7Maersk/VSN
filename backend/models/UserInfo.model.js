var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class UserInfo extends Model { }

UserInfo.init({
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

    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },

    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user_info',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = UserInfo