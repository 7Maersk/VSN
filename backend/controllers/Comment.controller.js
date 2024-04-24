const { Comment } = require('../models')

module.exports = {
    async create(req, res) {
        const { text, user_id, objectId, type } = req.body

        /**
         * 1. консистентные имена "user_id, object_id || userId, objectId"\
         * 2. добавить поле time в req.body, т.к. запрос может прийти с задержкой и время будет неверное
         * 3. добавить в req.body поля record_id && post_id, в зависимости от того где оставили комментарий
         *    одно поле указать null, а второе заполнить значением
         */

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