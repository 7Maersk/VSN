const { Comment, UserInfo } = require('../models')
const { sequelize } = require('../db.config')



module.exports = {
    // async create(req, res) {
    //     const { text, user_id, objectId, type } = req.body

    //     /**
    //      * 1. консистентные имена "user_id, object_id || userId, objectId"\
    //      * 2. добавить поле time в req.body, т.к. запрос может прийти с задержкой и время будет неверное
    //      * 3. добавить в req.body поля record_id && post_id, в зависимости от того где оставили комментарий
    //      *    одно поле указать null, а второе заполнить значением
    //      */

    //     let [record_id, post_id] = [null, null]
    //     let datetime = Date.now()
    //     switch (type) {
    //         case 'record':
    //             record_id = objectId
    //             break
    //         case 'post':
    //             post_id = objectId
    //             break
    //         default:
    //             return res.status(400).json({ message: 'Ошибка при создании комментария' })
    //     }
    //     return Comment.create({
    //         datetime,
    //         text,
    //         user_id,
    //         post_id,
    //         record_id
    //     })
    //         .then(comment => res.json({ comment }))
    //         .catch(err => {
    //             console.log(err)
    //             res.status(400).json({ message: 'Ошибка при создании комментария' })
    //         })
    // },

    async create(req, res) {
        try {
            const { date, text, user_id, post_id, record_id } = req.body;

            const postIdValue = post_id ? parseInt(post_id, 10) : null;
            const recordIdValue = record_id ? parseInt(record_id, 10) : null;

            const newComment = await Comment.create({
                datetime: date,
                text: text,
                user_id: user_id,
                post_id: postIdValue,
                record_id: recordIdValue
            });

            res.json(newComment);
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500);
        }
    },

    async getComments(req, res) {
        try {
            const { post_id, record_id } = req.query;

            let comments;
            let whereCondition;

            if (post_id) {
                whereCondition = { post_id: parseInt(post_id, 10) };
            } else if (record_id) {
                whereCondition = { record_id: parseInt(record_id, 10) };
            } else {
                return res.status(400).json({ error: 'Either post_id or record_id must be provided' });
            }

            comments = await Comment.findAll({
                where: whereCondition,
                attributes: ['id', 'datetime', 'text', 'user_id', 'post_id', 'record_id'],
            });

            const userIds = [...new Set(comments.map(comment => comment.user_id))];

            const usersInfo = await UserInfo.findAll({
                where: { user_id: userIds },
                attributes: ['user_id', 'nickname', 'avatar'],
            });

            const usersInfoMap = new Map();
            usersInfo.forEach(user => {
                usersInfoMap.set(user.user_id, { nickname: user.nickname, avatar: user.avatar });
            });

            const formattedComments = comments.map(comment => ({
                id: comment.id,
                datetime: comment.datetime,
                text: comment.text,
                user_id: comment.user_id,
                nickname: usersInfoMap.get(comment.user_id)?.nickname || null,
                avatar: usersInfoMap.get(comment.user_id)?.avatar || null,
                post_id: comment.post_id,
                record_id: comment.record_id
            }));

            res.json(formattedComments);
        } catch (error) {
            console.error('Error retrieving comments:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }



    // async getBy(req, res) {
    //     const { objectid, type } = req.query
    //     let [record_id, post_id] = [null, null]
    //     switch (type) {
    //         case 'record':
    //             record_id = objectid
    //             break
    //         case 'post':
    //             post_id = objectid
    //             break
    //         default:
    //             return res.status(400).json({ message: '111Ошибка при загрузке комментариев' })
    //     }


    //     return Comment.findAll({
    //         where: {
    //             record_id,
    //             post_id
    //         }
    //     })
    //         .then(comments => res.json({ comments }))
    //         .catch(err => {
    //             console.log(err)
    //             res.status(400).json({ message: 'Ошибка загрузке комментариев' })
    //         })
    // }

    // TODO: DELETE после авторизации
}