const { Record, Song, Artist, ExtraArtist, RecordArtist } = require('../models');

module.exports = {
    async findSongsByRecordId(req, res) {
        const { recordId } = req.params;

        try {
            const record = await Record.findByPk(recordId);

            if (!record) {
                return res.status(404).json({ message: 'Запись не найдена' });
            }

            const songs = await Song.findAll({
                where: { record_id: recordId },
                attributes: ['id', 'title', 'duration', 'position'],
            });

            const songsWithArtists = await Promise.all(songs.map(async song => {
                const artists = await Artist.findAll({
                    include: [
                        {
                            model: Song,
                            where: { id: song.id },
                            attributes: [],
                        },
                    ],
                    attributes: ['nickname'],
                });

                return {
                    id: song.id,
                    title: song.title,
                    duration: song.duration,
                    position: song.position,
                    artist: artists.map(artist => artist.nickname),
                };
            }));

            res.json(songsWithArtists);
        } catch (error) {
            console.error('Ошибка при поиске песен:', error);
            res.status(500).json({ message: 'Ошибка при поиске песен' });
        }
    }

};
