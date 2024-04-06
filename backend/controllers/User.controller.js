const { User, Role } = require('../models')

module.exports = {
    async create(req, res) {
        const { login, password, roleName } = req.body

        const role = await Role.findOne({ where: { name: roleName } })

        if (role.get('id')) {
            console.log('role.get(\'id\')', role.get('id'))
            return User.create({
                login,
                password,
                role_id: role.get('id')
            })
                .then(user => res.json({ user }))
                .catch(err => {
                    console.log(err)
                    res.status(400).json({ message: 'Ошибка при создании пользователя' })
                })

        }

    },

    async delete(req, res) {
        const { id } = req.body

        try {
            const user = await User.findByPk(id)

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' })
            }

            await user.destroy()

            return res.json({ message: 'Пользователь успешно удален' })
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error)
            return res.status(400).json({ message: 'Ошибка при удалении пользователя' })
        }
    }

}