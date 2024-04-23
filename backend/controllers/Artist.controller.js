const { Artist } = require('../models');

module.exports = {
    async findAll(req, res) {
        try {
            const artists = await Artist.findAll();

            return res.json({ artists });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске всех артистов' });
        }
    }
}
