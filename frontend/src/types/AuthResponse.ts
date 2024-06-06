export default interface AuthResponse {
	user: {
		id: number
		login: string
		nickname: string
	}
	accessToken: string
	refreshToken: string
}
