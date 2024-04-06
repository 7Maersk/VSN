const { Comment } = require('../models')

module.exports = {
    async create(req, res) {
        const { text, user_id, objectId, type } = req.body
        let [record_id, post_id] = [null, null]
        let datetime = Date.now()
        switch (type) {
            case 'record':
                record_id = objectId
                break
            case 'post':
                post_id = objectId
                break
            default:
                res.status(400).json({ message: 'Ошибка при создании комментария' })
        }
        return Comment.create({
            datetime,
            text,
            user_id,
            post_id,
            record_id
        })
            .then(comment => res.json({ comment }))
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: 'Ошибка при создании комментария' })
            })
    },

    async getBy(req, res) {
        const { objectid, type } = req.query
        console.log(objectid, type)
        let [record_id, post_id] = [null, null]
        switch (type) {
            case 'record':
                record_id = objectid
                break
            case 'post':
                post_id = objectid
                break
            default:
                res.status(400).json({ message: 'Ошибка при загрузке комментариев' })
        }

        return Comment.findAll({
            where: {
                record_id,
                post_id
            }
        })
            .then(comments => res.json({ status: 'ok', comments }))
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: 'Ошибка загрузке комментариев' })
            })
    }

    // TODO: DELETE после авторизации
}