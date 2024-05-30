const { Genre } = require('../models');

const genreController = {
    async findAll(req, res) {
        try {
            const genres = await Genre.findAll({
                attributes: ['name']
            });

            return res.json({ genres });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: 'Ошибка загрузке жанров' });
        }
    },

};

module.exports = genreController;