const { Ticket, UserInfo } = require('../models');

module.exports = {
    async create(req, res) {
        try {
            const { text, user_id } = req.body;

            const newTicket = await Ticket.create({
                text: text,
                user_id: user_id
            });

            res.json(newTicket);
        } catch (error) {
            console.error('Error creating ticket:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }

            await ticket.destroy();

            res.json({ message: 'Ticket deleted successfully' });
        } catch (error) {
            console.error('Error deleting ticket:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async findAll(req, res) {
        try {
            const tickets = await Ticket.findAll();

            const userIds = tickets.map(ticket => ticket.user_id);

            const usersInfo = await UserInfo.findAll({
                where: { user_id: userIds },
                attributes: ['user_id', 'nickname']
            });

            const userInfoMap = new Map();
            usersInfo.forEach(userInfo => {
                userInfoMap.set(userInfo.user_id, userInfo.nickname);
            });

            const ticketsWithUserInfo = tickets.map(ticket => ({
                ...ticket.toJSON(),
                nickname: userInfoMap.get(ticket.user_id) || null
            }));

            res.json(ticketsWithUserInfo);
        } catch (error) {
            console.error('Error retrieving tickets:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
