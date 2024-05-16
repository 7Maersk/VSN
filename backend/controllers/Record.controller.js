const { Op } = require('sequelize');
const axios = require('axios');
const { Record, Genre, RecordArtist, Artist, RecordGenre, Country, sequelize, Song, ExtraArtist } = require('../models');

const DISCOGS_API_KEY = 'NHtHpxAeScysczOrWfzz';
const DISCOGS_API_SECRET = 'TWEQMcVJWNPRgFYFsFbyHWUPYgUeNsAJ';

function durationToSeconds(duration) {
    if (!duration) {
        return 0;
    }
    const parts = duration.split(':').reverse();
    let seconds = 0;
    for (let i = 0; i < parts.length; i++) {
        const part = parseInt(parts[i], 10);
        if (!isNaN(part)) {
            seconds += part * Math.pow(60, i);
        }
    }
    return seconds;
}

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

    // async addById(req, res) {
    //     const releaseId = req.body.releaseId;
    //     const discogsUrl = `https://api.discogs.com/releases/${releaseId}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`;

    //     try {
    //         const response = await axios.get(discogsUrl);
    //         const data = response.data;

    //         console.log(data)

    //         const name = data.title;
    //         const katalog_number = data.labels[0]?.catno;
    //         const release_date = data.released ? new Date(data.released) : null;
    //         const countryName = data.country;
    //         const cover = data.images.find(image => image.type === 'primary')?.uri;
    //         const rating = 0;

    //         const existingRecord = await Record.findOne({ where: { katalog_number } });
    //         if (existingRecord) {
    //             return res.status(400).json({ message: 'Запись с таким каталожным номером уже существует', existingRecord });
    //         }

    //         let country = await Country.findOne({ where: { name: countryName } });
    //         if (!country) {
    //             country = await Country.create({ name: countryName });
    //         }
    //         const countryId = country ? country.id : null;
    //         const newRecord = await Record.create({
    //             name,
    //             katalog_number,
    //             release_date,
    //             country_id: countryId,
    //             cover,
    //             rating
    //         });

    //         const artists = data.artists || [];
    //         for (const artist of artists) {
    //             let dbArtist = await Artist.findOne({ where: { nickname: artist.name } });
    //             if (!dbArtist) {
    //                 const artistResponse = await axios.get(`${artist.resource_url}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`);
    //                 const artistData = artistResponse.data;
    //                 dbArtist = await Artist.create({
    //                     nickname: artist.name,
    //                     first_name: artistData.realname || '',
    //                     last_name: '',
    //                     surname: '',
    //                     bio: artistData.profile || '',
    //                     avatar: artistData.images?.find(image => image.type === 'primary')?.uri || ''
    //                 });
    //             }

    //             await RecordArtist.create({
    //                 record_id: newRecord.id,
    //                 artist_id: dbArtist.id
    //             });
    //         }

    //         const tracklist = data.tracklist || [];
    //         for (const track of tracklist) {
    //             const durationString = track.duration;
    //             const duration = durationToSeconds(durationString);
    //             const newSong = await Song.create({
    //                 title: track.title,
    //                 duration,
    //                 position: track.position,
    //                 record_id: newRecord.id
    //             });

    //             if (track.extraartists && track.extraartists.length > 0) {
    //                 for (const extraArtist of track.extraartists) {
    //                     if (extraArtist.role === 'Featuring') {
    //                         let dbArtist = await Artist.findOne({ where: { nickname: extraArtist.name } });
    //                         if (!dbArtist) {
    //                             const artistResponse = await axios.get(`${extraArtist.resource_url}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`);
    //                             const artistData = artistResponse.data;
    //                             dbArtist = await Artist.create({
    //                                 nickname: extraArtist.name,
    //                                 first_name: artistData.realname || '',
    //                                 last_name: '',
    //                                 surname: '',
    //                                 bio: artistData.profile || '',
    //                                 avatar: artistData.images?.find(image => image.type === 'primary')?.uri || ''
    //                             });
    //                         }

    //                         await ExtraArtist.create({
    //                             song_id: newSong.id,
    //                             artist_id: dbArtist.id
    //                         });
    //                     }
    //                 }
    //             }
    //         }

    //         return res.json(newRecord);
    //     } catch (error) {
    //         console.error('Error fetching data from Discogs API:', error);
    //         return res.status(500).json({ message: 'Ошибка при запросе данных из Discogs API' });
    //     }
    // },

    async addById(req, res) {
        const releaseId = req.body.releaseId;
        const discogsUrl = `https://api.discogs.com/releases/${releaseId}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`;

        try {
            const response = await axios.get(discogsUrl);
            const data = response.data;

            const name = data.title;
            const katalog_number = data.labels[0]?.catno;
            const release_date = data.released ? new Date(data.released) : null;
            const countryName = data.country;
            const cover = data.images.find(image => image.type === 'primary')?.uri;
            const rating = 0;

            const existingRecord = await Record.findOne({ where: { katalog_number } });
            if (existingRecord) {
                return res.status(400).json({ message: 'Запись с таким каталожным номером уже существует', existingRecord });
            }

            let country = await Country.findOne({ where: { name: countryName } });
            if (!country) {
                country = await Country.create({ name: countryName });
            }
            const countryId = country ? country.id : null;
            const newRecord = await Record.create({
                name,
                katalog_number,
                release_date,
                country_id: countryId,
                cover,
                rating
            });

            const artists = data.artists || [];
            for (const artist of artists) {
                let dbArtist = await Artist.findOne({ where: { nickname: artist.name } });
                if (!dbArtist) {
                    const artistResponse = await axios.get(`${artist.resource_url}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`);
                    const artistData = artistResponse.data;
                    dbArtist = await Artist.create({
                        nickname: artist.name,
                        first_name: artistData.realname || '',
                        last_name: '',
                        surname: '',
                        bio: artistData.profile || '',
                        avatar: artistData.images?.find(image => image.type === 'primary')?.uri || ''
                    });
                }

                await RecordArtist.create({
                    record_id: newRecord.id,
                    artist_id: dbArtist.id
                });
            }

            const genres = data.genres || [];
            for (const genreName of genres) {
                let genre = await Genre.findOne({ where: { name: genreName } });
                if (!genre) {
                    genre = await Genre.create({ name: genreName });
                }
                const genreId = genre ? genre.id : null;
                await RecordGenre.create({
                    record_id: newRecord.id,
                    genre_id: genreId
                });
            }

            const tracklist = data.tracklist || [];
            for (const track of tracklist) {
                const durationString = track.duration;
                const duration = durationToSeconds(durationString);
                const newSong = await Song.create({
                    title: track.title,
                    duration,
                    position: track.position,
                    record_id: newRecord.id
                });

                if (track.extraartists && track.extraartists.length > 0) {
                    for (const extraArtist of track.extraartists) {
                        if (extraArtist.role === 'Featuring') {
                            let dbArtist = await Artist.findOne({ where: { nickname: extraArtist.name } });
                            if (!dbArtist) {
                                const artistResponse = await axios.get(`${extraArtist.resource_url}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`);
                                const artistData = artistResponse.data;
                                dbArtist = await Artist.create({
                                    nickname: extraArtist.name,
                                    first_name: artistData.realname || '',
                                    last_name: '',
                                    surname: '',
                                    bio: artistData.profile || '',
                                    avatar: artistData.images?.find(image => image.type === 'primary')?.uri || ''
                                });
                            }

                            await ExtraArtist.create({
                                song_id: newSong.id,
                                artist_id: dbArtist.id
                            });
                        }
                    }
                }
            }

            return res.json(newRecord);
        } catch (error) {
            console.error('Error fetching data from Discogs API:', error);
            return res.status(500).json({ message: 'Ошибка при запросе данных из Discogs API' });
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
