export type Post = {
    id: number
    name: string
    text: string
    nickname: string
    typeName: 'post' | 'review',
    img: string
}