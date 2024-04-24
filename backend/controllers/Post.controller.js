const { Post, User, UserInfo } = require('../models')
const { findOne } = require('../models/Post.model')

module.exports = {
    async create(req, res) {
        const { datetime, username, name, text, img } = req.body
        const user = await UserInfo.findOne({ where: { nickname: username } })

        return Post.create({
            datetime,
            user_id: user.get('user_id'),
            name,
            text,
            img
        })
            .then(post => res.json({ post }))
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: 'Ошибка при создании поста' })
            })
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
            const user = await User.findByPk(post.user_id);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            const userInfo = await UserInfo.findOne({
                where: { user_id: user.id }
            });

            if (!userInfo) {
                return res.status(404).json({ message: 'Информация о пользователе не найдена' });
            }
            const { id, datetime, name, text, img } = post;
            const { nickname } = userInfo;
            return res.json({ post: { id, datetime, name, text, img, nickname } });
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
                attributes: ['id', 'name', 'img']
            });

            const formattedPosts = posts.map(post => {
                const { id, name, img, User } = post;
                const nickname = User && User.UserInfo ? User.UserInfo.nickname : null;
                return { id, name, img, nickname };
            });

            return res.json({ posts: formattedPosts });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске всех постов' });
        }
    }

}
