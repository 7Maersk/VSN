const { Sequelize } = require('sequelize');
const { Room, Message } = require('../models');

const roomController = {
    async findAll(req, res) {
        try {
            const rooms = await Room.findAll({
                attributes: ['name', 'id', [Sequelize.fn('COUNT', Sequelize.col('messages.id')), 'messages_count']],
                include: [
                    {
                        model: Message,
                        attributes: []
                    }
                ],
                group: ['rooms.name', 'rooms.id']
            }).then(result => result.map(el => el.get({ plain: true })))

            console.log('rooms', rooms)

            return res.json({ rooms });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: 'Ошибка загрузке комнат' });
        }
    },

};

module.exports = roomController;