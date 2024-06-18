const jwt = require('jsonwebtoken')
const sessions = require('../sessions')

const checkAuth = (req, res, next) => {
	const sessionId = req.headers.cookie?.split('=')[1]

	const userSession = sessions[sessionId]

	if (!userSession) return res.status(401).json({ message: 'Недействительная сессия'})
	
	next()
}

const checkPrivileges = (sessionId, privilege) => {
	const userSession = sessions[sessionId]
	if (!userSession) return 'Такой сессии нет'

	if (userSession.role === privilege) return true

	return false
}

function verifyToken(req, res, next) {
	const accessToken = req.headers['authorization']
	const refreshToken = req.cookies['refreshToken']

	if (!accessToken && !refreshToken) {
		return res.status(401).send('Access Denied. No token provided.')
	}

	try {
		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
		req.userId = decoded.id
		next()
	} catch (error) {
		if (!refreshToken) {
			return res.status(401).send('Access Denied. No refresh token provided.')
		}

		try {
			const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
			const accessToken = jwt.sign({ id: decoded.id }, secretKey, { expiresIn: '1h' })

			res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
				.header('Authorization', accessToken)
				.send(decoded.id)
		} catch (error) {
			return res.status(400).send('Invalid Token.')
		}
	}

	// let token = req.headers.authorization?.split('Bearer ')[1] || ''

	// if (!token) {
	// 	res.status(403).send({
	// 		message: 'Токен не предоставлен',
	// 	})
	// 	return
	// }
	// jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
	// 	if (err) {
	// 		res.status(401).send({
	// 			message: 'Неверно введенный логин и/или пароль',
	// 		})
	// 		return
	// 	}
	// 	req.userId = decoded.id
	// 	next()
	// })
}

const refreshToken = (req, res) => {
	const refreshToken = req.cookies['refreshToken']
	if (!refreshToken) {
		return res.status(401).send('Access Denied. No refresh token provided.')
	}

	try {
		const decoded = jwt.verify(refreshToken, secretKey)
		const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

		res.header('Authorization', accessToken).send(decoded.id)
	} catch (error) {
		return res.status(400).send('Invalid refresh token.')
	}
}

module.exports = { checkAuth, checkPrivileges }
