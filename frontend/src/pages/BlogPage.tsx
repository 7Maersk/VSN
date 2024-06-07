import { api } from '@/api/api.config'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Post } from '@/types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const BlogPage = () => {
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		api.getPosts().then((posts) => setPosts(posts))
	}, [])

	return (
		<div className="col-span-8 row-span-12 px-4 py-4 w-full h-full grid grid-cols-12 gap-4">
			{posts.map((post) => {
				return <Card className="col-span-4" key={post.id}>
					<CardHeader>
						<Link to={`/post/${post.id}`} className="contents">
							<img
								src={`${api.staticURL}/images/${post.img}`}
								alt={`Album ${post.name}`}
								className="absolute w-full h-full object-cover object-center top-0 left-0 rounded-t-md"
							/>
						</Link>
						<CardTitle>{post.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{post.typeName}</p>
					</CardContent>
					<CardFooter>
						<Link to={`/post/${post.id}`} className="contents"></Link>
						<p>{post.nickname}</p>
					</CardFooter>
				</Card>
			})}
		</div>
	)
}

export default BlogPage
