export default interface Album {
	id: number
	name: string
	cover: string
	release_date: string
	country: {
		name: string
	}
	rating: number
	artists: {
		nickname: string
	}[]
}