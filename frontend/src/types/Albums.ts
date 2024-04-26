import Artist from './Artist'

export default interface Albums {
	id: number
	name: string
	cover: string
	rating: number
	artists: Artist[]
}
