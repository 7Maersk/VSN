import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { Albums, Artist, AuthResponse, Genre, Post } from '@/types'
import { Album } from '@/types'
import User from '@/types/User'

const server = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:3001/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

server.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const state = localStorage.getItem('state')
	if (state) {
		const tokens = JSON.parse(state)
		config.headers.Authorization = `Bearer ${tokens.accessToken}`
	}

	return config
})

// let's think about it
// server.interceptors.request.use((config) => {
// 	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
// 	return config
// })

// server.interceptors.response.use(
// 	// в случае валидного accessToken ничего не делаем:
// 	(config) => {
// 		return config
// 	},
// 	// в случае просроченного accessToken пытаемся его обновить:
// 	async (error) => {
// 		// предотвращаем зацикленный запрос, добавляя свойство _isRetry
// 		const originalRequest = { ...error.config }
// 		originalRequest._isRetry = true
// 		if (
// 			// проверим, что ошибка именно из-за невалидного accessToken
// 			error.response.status === 401 &&
// 			// проверим, что запрос не повторный
// 			error.config &&
// 			!error.config._isRetry
// 		) {
// 			try {
// 				// запрос на обновление токенов
// 				const resp = await server.get('/api/refresh')
// 				// сохраняем новый accessToken в localStorage
// 				localStorage.setItem('token', resp.data.accessToken)
// 				// переотправляем запрос с обновленным accessToken
// 				return server.request(originalRequest)
// 			} catch (error) {
// 				console.log('AUTH ERROR')
// 			}
// 		}
// 		// на случай, если возникла другая ошибка (не связанная с авторизацией)
// 		// пробросим эту ошибку
// 		throw error
// 	}
// )

const api = {
	baseUrl: 'http://localhost:3001/api',
	staticURL: 'http://localhost:3001',

	getPosts: (): Promise<Post[]> => {
		return server
			.get<{ posts: Post[] }>('/post')
			.then(({ data }) => data.posts)
			.catch((error) => {
				console.error(error)
				return []
			})
	},

	getArtists: (): Promise<Artist[]> => {
		return server
			.get<{ artists: Artist[] }>('/artists')
			.then(({ data }) => data.artists)
			.catch((error) => {
				console.error(error)
				return []
			})
	},

	getRecords: (): Promise<Albums[]> => {
		return server
			.get<{ records: Albums[] }>('/records')
			.then(({ data }) => data.records)
			.catch((error) => {
				console.error(error)
				return []
			})
	},

	getRecord: (id: string): Promise<Album | null> => {
		return server
			.get<{ record: Album }>(`/records/${id}`)
			.then(({ data }) => data.record)
			.catch((error) => {
				console.error(error)
				return null
			})
	},

	getArtistRecord: (id: string): Promise<string> => {
		return server
			.get<{ nickname: string }>(`/artists/record/${id}`)
			.then(({ data }) => data.nickname)
			.catch((error) => {
				console.error(error)
				return ''
			})
	},

	getRecordsArtist: (nickname: string) => {
		return server
			.get<{ records: Albums[] }>(`/records/artistn/${nickname}`)
			.then(({ data }) => data.records)
			.catch((error) => {
				console.error(error)
				return []
			})
	},

	getGenres: (): Promise<Genre[]> => {
		return server
			.get<{ genres: Genre[] }>('/genres')
			.then(({ data }) => data.genres)
			.catch((error) => {
				console.error(error)
				return []
			})
	},

	getRecordsArtistId: (id: string) => {
		return server
			.get<{ records: Albums[] }>(`/records/artist/${id}`)
			.then(({ data }) => data.records)
			.catch((error) => {
				console.error(error)
				return []
			})
	},

	getArtist: (id: string): Promise<Artist | null> => {
		return server
			.get<{ artist: Artist }>(`/artists/${id}`)
			.then(({ data }) => data.artist)
			.catch((error) => {
				console.error(error)
				return null
			})
	},

	getUserInfo: (id: string): Promise<User | null> => {
		return server
			.get<{ user: User }>(`/user/${id}`)
			.then(({ data }) => data.user)
			.catch((error) => {
				console.error(error)
				return null
			})
	},
}

//TODO: Перенести в AuthService.ts
class AuthService {
	static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return server.post<AuthResponse>('user/login', {
			login,
			password,
		})
	}

	static async registration(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return server.post<AuthResponse>('user/registration', {
			login,
			password,
		})
	}
	static async logout(): Promise<void> {
		return server.post('user/logout')
	}
}

// export default { api, server }
export { api, AuthService }
