const { Post, User, UserInfo } = require('../models')
const { findOne } = require('../models/Post.model')

module.exports = {
    async create(req, res) {
        const { datetime, username, name, text, img } = req.body

        const user = await UserInfo.findOne({ where: { nickname: username } })
        console.log(user)

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

            return res.json({ post });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске поста' });
        }
    },

    async findAll(req, res) {
        try {
            const posts = await Post.findAll();

            return res.json({ posts });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка при поиске всех постов' });
        }
    }
}
