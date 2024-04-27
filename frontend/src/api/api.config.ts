import axios from 'axios'
import { Albums, Artist, Genre } from '@/types'
import { Album } from '@/types'

const server = axios.create({
	baseURL: 'http://localhost:3001/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

const api = {
	staticURL: 'http://localhost:3001',
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
}

export default api
