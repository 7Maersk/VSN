const { Comment, UserInfo } = require('../models')
const { sequelize } = require('../db.config')



module.exports = {
    async create(req, res) {
        try {
            const { datetime, text, user_id, post_id, record_id } = req.body;

            const postIdValue = post_id ? parseInt(post_id, 10) : null;
            const recordIdValue = record_id ? parseInt(record_id, 10) : null;

            const newComment = await Comment.create({
                datetime: datetime,
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
    // TODO: DELETE после авторизации
}