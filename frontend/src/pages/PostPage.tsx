import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { api } from '@/api/api.config'
import { Comment, Post } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useAuth from '@/store/auth.store'

const PostPage = () => {
	const { id } = useParams<{ id: string }>() as { id: string }

	const [post, setPost] = useState<Post | null>(null)

	// const user_id = (JSON.parse(localStorage.getItem('auth') || '{}')?.state?.user?.id).toString();

	const { user } = useAuth()

	const [commentText, setCommentText] = useState('')
	const [comments, setComments] = useState<Comment[]>([])

	const [t] = useTranslation('global')

	const handleCommentSubmit = async () => {
		if (commentText.trim()) {
			try {
				const newComment = await api.createComment({
					datetime: new Date().toISOString(),
					text: commentText,
					user_id: user?.id || 1,
					post_id: id,
					record_id: '',
					nickname: user?.nickname || '',
				})
				setComments([...comments, newComment])
				setCommentText('')
			} catch (error) {
				console.error('Ошибка при добавлении комментария:', error)
			}
		}
	}

	useEffect(() => {
		Promise.all([api.getPost(id || '1')])
			.then(([post]) => {
				setPost(post)
			})
			.catch((error) => console.error('Ошибка при загрузке данных:', error))
	}, [id])

	useEffect(() => {
		api.getComments({ type: 'post_id', id: Number(id) }).then((comments) => {
			setComments(comments)
		})
	}, [id])

	if (!post) {
		return <div>404</div>
	}

	return (
		<div className="col-span-8 row-span-12 px-4 py-4 overflow-auto">
			<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t('translation.comments')}</h3>
			<div className="mt-4">
				<Input
					type="text"
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
					placeholder={t('translation.add')}
					className="w-full p-2 border rounded-md"
				/>
				<Button onClick={handleCommentSubmit} className="mt-4 px-4 py-2 rounded-md">
					{t('translation.add')}
				</Button>

				<div className="mt-4">
					{comments.map((comment: any) => (
						<div key={comment.id} className="border p-2 rounded-md mt-2">
							<p>
								{t('translation.author')}: {comment.nickname}
							</p>
							<p>{comment.text}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PostPage
