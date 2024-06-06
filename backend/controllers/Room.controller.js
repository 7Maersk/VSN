const { Room } = require('../models');

const roomController = {
    async findAll(req, res) {
        try {
            const rooms = await Room.findAll({
                attributes: ['name']
            });

            return res.json({ rooms });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: 'Ошибка загрузке комнат' });
        }
    },

};

module.exports = roomController;