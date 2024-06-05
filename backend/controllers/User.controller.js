const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Role, UserInfo } = require('../models')

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
			const user = await User.findOne({ where: { login } })
			if (!user) {
				return res.status(400).json({ message: 'Пользователь не найден' })
			}

			const isPasswordValid = await bcrypt.compare(password, user.password)
			if (!isPasswordValid) {
				return res.status(401).json({ message: 'Неправильный логин или пароль' })
			}

			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: '1m',
			})

			const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: '1d',
			})

			return res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).json({
				accessToken: token,
				refreshToken: refreshToken,
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

	async updatePassword(req, res) {
		const { userId, oldPassword, newPassword } = req.body

		try {
			const user = await User.findByPk(userId)
			if (!user) {
				return res.status(404).json({ message: 'Пользователь не найден' })
			}

			const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)
			if (!isOldPasswordValid) {
				return res.status(401).json({ message: 'Старый пароль неверен' })
			}

			const hashedNewPassword = await bcrypt.hash(newPassword, 10)
			user.password = hashedNewPassword
			await user.save()

			return res.json({ message: 'Пароль успешно обновлен' })
		} catch (error) {
			console.error('Ошибка при обновлении пароля:', error)
			return res.status(500).json({ message: 'Ошибка при обновлении пароля' })
		}
	},

	async updateUserInfo(req, res) {
		const { user_id, nickname, bio, avatar } = req.body

		try {
			const existingUserInfo = await UserInfo.findOne({ where: { user_id: user_id } })

			if (existingUserInfo) {
				existingUserInfo.nickname = nickname
				existingUserInfo.bio = bio
				existingUserInfo.avatar = avatar
				await existingUserInfo.save()
				return res.status(200).json({ message: 'Информация о пользователе успешно обновлена' })
			} else {
				const newUserInfo = await UserInfo.create({
					user_id,
					nickname,
					bio,
					avatar,
				})
				return res
					.status(201)
					.json({ message: 'Информация о пользователе успешно создана', userInfo: newUserInfo })
			}
		} catch (error) {
			console.error('Ошибка при обновлении информации о пользователе:', error)
			return res.status(500).json({ message: 'Ошибка при обновлении информации о пользователе' })
		}
	},

	async getUserInfo(req, res) {
		const { user_id } = req.params

		try {
			const userInfo = await UserInfo.findOne({ where: { user_id: user_id } })

			if (userInfo) {
				return res.status(200).json({
					id: user_id,
					nickname: userInfo.nickname,
					bio: userInfo.bio,
					avatar: userInfo.avatar,
				})
			} else {
				return res.status(404).json({ message: 'Информация о пользователе не найдена' })
			}
		} catch (error) {
			console.error('Ошибка при получении информации о пользователе:', error)
			return res.status(500).json({ message: 'Ошибка при получении информации о пользователе' })
		}
	},
}
