const { Op } = require('sequelize');
const { Record, Genre, RecordArtist, Artist, RecordGenre, Country } = require('../models');

module.exports = {
    async findAll(req, res) {
        try {
            const records = await Record.findAll();
            return res.json({ records });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске всех записей' });
        }
    },

    async findById(req, res) {
        const recordId = req.params.recordId;

        try {
            const record = await Record.findByPk(recordId);
            if (!record) {
                return res.status(404).json({ message: 'Запись не найдена' });
            }
            return res.json({ record });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске записи' });
        }
    },

    async findByArtist(req, res) {
        const artistName = req.params.artistName;
        try {
            const artist = await Artist.findOne({ where: { nickname: artistName } });

            if (!artist) {
                return res.status(404).json({ message: 'Артист не найден' });
            }

            const recordsArtists = await RecordArtist.findAll({
                where: { artist_id: artist.id }
            })

            const recordIds = recordsArtists.map(recordsArtist => recordsArtist.record_id)

            const records = await Record.findAll({
                where: { id: recordIds }
            })

            return res.json({ records });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске пластинок по артисту' });
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
                where: { id: recordIds }
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
                }
            });

            return res.json({ records });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске записей по стране' });
        }
    }

}
