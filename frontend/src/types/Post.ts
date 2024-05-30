export type Post = {
    id: number
    name: string
    nickname: string
    typeName: 'post' | 'review',
    img: string
}