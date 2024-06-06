import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { api } from '@/api/api.config'
import { Album, Albums, Artist, Comment, Post } from '@/types'

const PostPage = () => {
    const { id } = useParams<{ id: string }>()

    const [post, setPost] = useState<Post | null>(null)

    const user_id = (JSON.parse(localStorage.getItem('auth') || '{}')?.state?.user?.id).toString();

    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);

    const [t] = useTranslation('global')

    const handleCommentSubmit = async () => {
        if (commentText.trim()) {
            try {
                const newComment = await api.createComment({
                    datetime: new Date().toISOString(),
                    text: commentText,
                    user_id: user_id,
                    post_id: "",
                    record_id: Number(id),
                });
                setComments([...comments, newComment]);
                setCommentText('');
            } catch (error) {
                console.error('Ошибка при добавлении комментария:', error);
            }
        }
    };

    useEffect(() => {
        Promise.all([
            api.getPost(id || '1'),
        ])
            .then(([post]) => {
                setPost(post);
                // return api.getArtistRecord(id || '1');
            })
            .catch((error) => console.error('Ошибка при загрузке данных:', error));
    }, [id]);

    useEffect(() => {
        api.getComments({ type: 'post_id', id: Number(id) })
            .then((comments) => {
                setComments(comments);
            })
    }, [id]);


    if (!post) {
        return <div>404</div>
    }

    return (
        <div className="mt-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t('translation.comments')}</h3>
            <div className="mt-4">
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t('translation.add')}
                    className="w-full p-2 border rounded-md"
                />
                <button
                    onClick={handleCommentSubmit}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    {t('translation.add')}
                </button>

                <div className="mt-4">
                    {comments.map((comment: any) => (
                        <div key={comment.id} className="border p-2 rounded-md mt-2">
                            <p>{t('translation.author')}: {comment.nickname}</p>
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostPage
