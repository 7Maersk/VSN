const { UserCollection, Record, Artist, RecordArtist } = require('../models')

module.exports = {
    async create(req, res) {
        const { user_id, record_id, is_fav } = req.body
        let is_exist = await UserCollection.findAll({
            where: {
                user_id,
                record_id
            }
        })
        switch (is_exist.length) {
            case 0:
                return UserCollection.create({
                    user_id,
                    record_id,
                    is_fav
                })
                    .then(collection => res.json({ collection }))
                    .catch(err => {
                        console.log(err)
                        res.status(400).json({ message: 'Ошибка при добавлении записи в коллекцию' })
                    })
            case 1:
                is_exist = is_exist[0]
                if (is_exist.is_fav == is_fav) {
                    res.status(400).json({ message: 'Такая запись уже существует' })
                } else {
                    return UserCollection.update(
                        { is_fav },
                        {
                            where: {
                                user_id,
                                record_id
                            }
                        })
                        .then(collection => res.json({ collection }))
                        .catch(err => {
                            console.log(err)
                            res.status(400).json({ message: 'Ошибка при изменении коллекции' })
                        })
                }
                break
            default:
                res.status(400).json({ message: 'Ошибка при добавлении записи в коллекцию' })
        }

        console.log(is_exist)
    },

    async getFavoriteRecords(req, res) {
        const userId = req.params.userId;
        
        try {
            const favoriteRecords = await UserCollection.findAll({
                where: {
                    user_id: userId,
                    is_fav: true
                }
            });
            
            const formattedRecords = await Promise.all(favoriteRecords.map(async favRecord => {
                const record = await Record.findOne({
                    where: { id: favRecord.record_id },
                    attributes: ['id', 'name', 'cover', 'release_date']
                });
    
                const recordArtists = await RecordArtist.findAll({
                    where: { record_id: favRecord.record_id }
                });
    
                const artists = await Promise.all(recordArtists.map(async ra => {
                    const artist = await Artist.findOne({
                        where: { id: ra.artist_id },
                        attributes: ['nickname']
                    });
                    return artist ? { nickname: artist.nickname } : null;
                }));
    
                return {
                    id: record.id,
                    name: record.name,
                    cover: record.cover,
                    artists: artists.filter(artist => artist !== null),
                    releasedate: record.release_date
                };
            }));
    
            return res.json({ records: formattedRecords });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при получении избранных пластинок' });
        }
    },
    
    async getUserCollection(req, res) {
        const userId = req.params.userId;
        
        try {
            const userCollection = await UserCollection.findAll({
                where: {
                    user_id: userId,
                    is_fav: null
                }
            });
    
            const formattedRecords = await Promise.all(userCollection.map(async collectionRecord => {
                const record = await Record.findOne({
                    where: { id: collectionRecord.record_id },
                    attributes: ['id', 'name', 'cover', 'release_date']
                });
    
                const recordArtists = await RecordArtist.findAll({
                    where: { record_id: collectionRecord.record_id }
                });
    
                const artists = await Promise.all(recordArtists.map(async ra => {
                    const artist = await Artist.findOne({
                        where: { id: ra.artist_id },
                        attributes: ['nickname']
                    });
                    return artist ? { nickname: artist.nickname } : null;
                }));
    
                return {
                    id: record.id,
                    name: record.name,
                    cover: record.cover,
                    artists: artists.filter(artist => artist !== null),
                    releasedate: record.release_date
                };
            }));
    
            return res.json({ records: formattedRecords });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при получении коллекции пользователя' });
        }
    }

    // async delete(req, res) {
    //     const
    // }
    // в req.body приходит user_id?


}