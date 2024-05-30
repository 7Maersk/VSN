const { UserCollection } = require('../models')

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

    }

    // async delete(req, res) {
    //     const
    // }
    // в req.body приходит user_id?


}