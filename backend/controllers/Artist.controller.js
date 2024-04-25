const { Artist } = require('../models');

module.exports = {
    async findAll(req, res) {
        try {
            const artists = await Artist.findAll({
                attributes: ['id', 'nickname', 'avatar']
            });

            return res.json({ artists });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске всех артистов' });
        }
    },

    async findById(req, res) {
        const { artistId } = req.params;

        try {
            const artist = await Artist.findByPk(artistId, {
                attributes: ['id', 'nickname', 'first_name', 'last_name', 'surname', 'bio', 'avatar']
            });

            if (!artist) {
                return res.status(404).json({ message: 'Артист не найден' });
            }

            return res.json({ artist });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске артиста по id' });
        }
    }
}
