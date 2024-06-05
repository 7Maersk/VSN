const { Post, User, UserInfo, PostType } = require('../models')
const { findOne } = require('../models/Post.model')

module.exports = {
    async create(req, res) {
        const { datetime, username, name, text, img, typename } = req.body;

        try {
            const user = await UserInfo.findOne({ where: { nickname: username } });

            let postType = await PostType.findOne({ where: { name: typename } });
            if (!postType) {
                postType = await PostType.create({ name: typename });
            }

            const post = await Post.create({
                datetime,
                user_id: user.get('user_id'),
                type_id: postType.get('id'),
                name,
                text,
                img
            });

            res.json({ post });
        } catch (error) {
            console.error('Ошибка при создании поста:', error);
            res.status(400).json({ message: 'Ошибка при создании поста' });
        }
    },

    async delete(req, res) {
        const postId = req.params.postId;
        const userId = req.user.id;

        try {
            const post = await Post.findByPk(postId);
            if (post.user_id !== userId) {
                return res.status(403).json({ message: 'Вы не можете удалить этот пост' });
            }
            await post.destroy();
            return res.status(200).json({ message: 'Пост успешно удален' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при удалении поста' });
        }
    },

    async findById(req, res) {
        const postId = req.params.postId;

        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ message: 'Пост не найден' });
            }

            const userInfo = await UserInfo.findOne({
                where: { user_id: post.user_id }
            });

            if (!userInfo) {
                return res.status(404).json({ message: 'Информация о пользователе не найдена' });
            }

            const postType = await PostType.findByPk(post.type_id);
            if (!postType) {
                return res.status(404).json({ message: 'Тип поста не найден' });
            }

            const { id, datetime, name, text, img } = post;
            const { nickname } = userInfo;
            const { name: typeName } = postType;

            return res.json({ post: { id, datetime, name, text, type: typeName, img, nickname } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске поста' });
        }
    },

    async findAll(req, res) {
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        include: {
                            model: UserInfo,
                            attributes: ['nickname']
                        }
                    }
                ],
                attributes: ['id', 'name', 'img', 'type_id']
            });

            const formattedPosts = [];

            for (const post of posts) {
                const { id, name, img, User, type_id } = post;
                const nickname = User && User.UserInfo ? User.UserInfo.nickname : null;

                const postType = await PostType.findByPk(type_id);
                if (!postType) {
                    return res.status(404).json({ message: 'Тип поста не найден' });
                }

                const { name: typeName } = postType;

                formattedPosts.push({ id, name, img, nickname, typeName });
            }

            return res.json({ posts: formattedPosts });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске всех постов' });
        }
    }
}
