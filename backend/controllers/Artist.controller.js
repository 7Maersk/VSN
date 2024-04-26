const { Artist, Record, RecordArtist } = require('../models');

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
    },

    async getFirstArtistNickname(req, res) {
        const { recordId } = req.params;
        try {
            const record = await Record.findByPk(recordId);
            if (!record) {
                return res.status(404).json({ message: 'Запись не найдена' });
            }

            const artist = await Artist.findOne({
                include: [{
                    model: Record,
                    where: { id: recordId }
                }]
            });

            if (!artist) {
                return res.status(404).json({ message: 'Артист не найден для данной записи' });
            }

            return res.json({ nickname: artist.nickname });
        } catch (error) {
            console.error('Ошибка при поиске артиста для записи:', error);
            return res.status(500).json({ message: 'Ошибка при поиске артиста для записи' });
        }
    }
}
