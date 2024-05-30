const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Role } = require('../models')

const generateToken = (userId) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

module.exports = {
	async register(req, res) {
		const { login, password, roleName } = req.body
		try {
			const usern = await User.findOne({ where: { login: login } })
			if (usern) {
				return res.status(400).json({ message: 'Пользователь с таким логином существует' })
			}
			const role = await Role.findOne({ where: { name: roleName } })
			if (!role) {
				return res.status(400).json({ message: 'Роль не найдена' })
			}
			const hashedPassword = await bcrypt.hash(password, 10)
			const user = await User.create({
				login,
				password: hashedPassword,
				role_id: role.id,
			})
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: 28800,
			})
			return res.status(201).json({ token })
		} catch (error) {
			console.error('Ошибка при регистрации:', error)
			return res.status(500).json({ message: 'Ошибка при регистрации пользователя' })
		}
	},

	async login(req, res) {
		const { login, password } = req.body

		try {
			// Находим пользователя по логину
			const user = await User.findOne({ where: { login } })
			if (!user) {
				return res.status(400).json({ message: 'Пользователь не найден' })
			}

			// Проверяем пароль
			const isPasswordValid = await bcrypt.compare(password, user.password)
			if (!isPasswordValid) {
				return res.status(401).json({ message: 'Неправильный логин или пароль' })
			}

			// const token = generateToken(user.id);
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: 28800,
			})

			return res.json({
				accessToken: token,
                refreshToken: '',
				user: {
					id: user.id,
					login,
				},
			})
		} catch (error) {
			console.error('Ошибка при аутентификации:', error)
			res.status(500).json({ message: 'Ошибка при аутентификации пользователя' })
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
	},
}
