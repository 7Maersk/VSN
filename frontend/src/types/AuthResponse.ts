export default interface AuthResponse {
	user: {
		id: number
		login: string
		nickname: string
		avatar: string
	}
	accessToken: string
	refreshToken: string
}
