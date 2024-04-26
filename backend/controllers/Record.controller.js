const { Op } = require('sequelize');
const { Record, Genre, RecordArtist, Artist, RecordGenre, Country, sequelize } = require('../models');

module.exports = {
    async findAll(req, res) {
        try {
            const records = await Record.findAll({
                attributes: ['id', 'name', 'cover'],
                include: [
                    {
                        model: Artist,
                        attributes: ['nickname'],
                        through: { attributes: [] }
                    }
                ]
            });
            return res.json({ records });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске всех записей' });
        }
    },

    async findById(req, res) {
        const recordId = req.params.recordId;

        try {
            const record = await Record.findByPk(recordId, {
                include: [{
                    model: Country,
                    attributes: ['name']
                },
                {
                    model: Artist,
                    attributes: ['nickname'],
                    through: { attributes: [] }
                }]
            });

            if (!record) {
                return res.status(404).json({ message: 'Запись не найдена' });
            }

            return res.json({ record });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске записи' });
        }
    },

    async findByGenre(req, res) {
        const genreName = req.params.genre;
        try {
            const genre = await Genre.findOne({
                where: { name: genreName }
            });

            if (!genre) {
                return res.status(404).json({ message: 'Жанр не найден' });
            }

            const recordsGenres = await RecordGenre.findAll({
                where: { genre_id: genre.id }
            });

            const recordIds = recordsGenres.map(recordGenre => recordGenre.record_id);
            const records = await Record.findAll({
                where: { id: recordIds },
                attributes: ['id', 'name', 'cover'],
                include: [
                    {
                        model: Artist,
                        attributes: ['nickname'],
                        through: { attributes: [] }
                    }
                ]
            });

            return res.json({ records });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске записей по жанру' });
        }
    },

    async findByCountry(req, res) {
        const countryName = req.params.countryName;
        try {
            const country = await Country.findOne({
                where: { name: countryName }
            });

            if (!country) {
                return res.status(404).json({ message: 'Страна не найдена' });
            }

            const countryId = country.id;

            const records = await Record.findAll({
                where: {
                    country_id: countryId
                },
                attributes: ['id', 'name', 'cover'],
                include: [
                    {
                        model: Artist,
                        attributes: ['nickname'],
                        through: { attributes: [] }
                    }
                ]
            });

            return res.json({ records });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске записей по стране' });
        }
    },

    //работает не до конца верно, не знаю как решить 
    async findByArtist(req, res) {
        const artistName = req.params.artistName;

        try {
            const artist = await Artist.findOne({ where: { nickname: artistName } });

            if (!artist) {
                return res.status(404).json({ message: 'Артист не найден' });
            }

            const records = await Record.findAll({
                include: [{
                    model: Artist,
                    attributes: ['nickname'],
                    through: { attributes: [] },
                    where: { nickname: artistName }
                }],
                attributes: ['id', 'name', 'cover']
            });

            return res.json({ records });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске пластинок по артисту' });
        }
    },

    async findByArtistId(req, res) {
        const artistId = req.params.artistId;

        try {
            const artist = await Artist.findByPk(artistId);

            if (!artist) {
                return res.status(404).json({ message: 'Артист не найден' });
            }

            const records = await Record.findAll({
                include: [{
                    model: Artist,
                    attributes: ['nickname'],
                    through: { attributes: [] },
                    where: { id: artistId }
                }],
                attributes: ['id', 'name', 'cover']
            });

            return res.json({ records });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске пластинок по id артиста' });
        }
    }


}
