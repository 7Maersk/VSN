export default interface AuthResponse {
	user: {
		id: number
		login: string
	}
	accessToken: string
	refreshToken: string
}
