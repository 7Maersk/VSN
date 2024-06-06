import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { api } from '@/api/api.config'
import { Album, Albums, Artist, Comment } from '@/types'

const AlbumPage = () => {
	const { id } = useParams<{ id: string }>()
	const [album, setAlbum] = useState<Album | null>(null)
	const [albums, setAlbums] = useState<Albums[]>([])
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

	// useEffect(() => {
	// 	api.getComments({ type: 'record_id', id: Number(id) })
	// 		.then((comments) => {
	// 			setComments(comments);
	// 		})
	// 		.catch((error) => console.error('Ошибка при получении комментариев:', error));
	// }, [id]);



	// useEffect(() => {
	// 	api.getRecord(id || '1')
	// 		.then((album) => setAlbum(album))
	// 		.then(() => {
	// 			api.getArtistRecord(id || '1').then((nickname) => {
	// 				api.getRecordsArtist(nickname).then((albums: Albums[]) => {
	// 					setAlbums(albums.filter((el) => el.id !== Number(id)))
	// 				})
	// 			})
	// 		})
	// }, [id])

	// useEffect(() => {
	// 	Promise.all([
	// 		api.getRecord(id || '1'),
	// 		api.getComments({ type: 'record_id', id: Number(id) })
	// 	])
	// 		.then(([album, comments]) => {
	// 			setAlbum(album);
	// 			setComments(comments);
	// 			// console.log(album)
	// 			// console.log(comments)
	// 			return api.getArtistRecord(id || '1');
	// 		})
	// 		.then((nickname) => {
	// 			return api.getRecordsArtist(nickname);
	// 		})
	// 		.then((albums: Albums[]) => {
	// 			setAlbums(albums.filter((el) => el.id !== Number(id)));
	// 		})
	// 		.catch((error) => console.error('Ошибка при загрузке данных:', error));
	// }, [id]);

	useEffect(() => {
		Promise.all([
			api.getRecord(id || '1'),
		])
			.then(([album]) => {
				setAlbum(album);
				return api.getArtistRecord(id || '1');
			})
			.then((nickname) => {
				return api.getRecordsArtist(nickname);
			})
			.then((albums: Albums[]) => {
				setAlbums(albums.filter((el) => el.id !== Number(id)));
			})
			.catch((error) => console.error('Ошибка при загрузке данных:', error));
	}, [id]);

	useEffect(() => {
		api.getComments({ type: 'record_id', id: Number(id) })
			.then((comments) => {
				setComments(comments);
			})
	}, [id]);


	if (!album) {
		return <div>404</div>
	}

	if (!albums) {
		return <div>нет других альбомов</div>
	}

	return (
		<div className="col-span-8 row-span-12 px-4 py-4">
			<div className="flex gap-4">
				<img
					className="aspect-square object-cover object-center rounded-md max-w-xs"
					src={`${api.staticURL}/albums/${album.cover}`}
					alt={`Album ${album.name}`}
				/>
				<div className="border rounded-md p-4 w-full">
					<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
						{album.name}
					</h2>

					<p className="leading-7 [&:not(:first-child)]:mt-4">
						<b>Release Date:</b> {album.release_date}
					</p>
					<p className="leading-7 [&:not(:first-child)]:mt-2">
						<b>Country:</b> {album.country.name}
					</p>
					<p className="leading-7 [&:not(:first-child)]:mt-2">
						<b>Rating:</b> {album.rating}
					</p>
					<p className="leading-7 [&:not(:first-child)]:mt-2">
						<b>Artists:</b> {album.artists.map((artist) => artist.nickname).join(', ')}
					</p>
					<p className="leading-7 [&:not(:first-child)]:mt-2">
						<b>Genres:</b> {album.genres.map((genre) => genre.name).join(', ')}
					</p>
				</div>
			</div>
			<div className="mt-4">
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t('translation.more')}</h3>
				<Carousel
					opts={{
						align: 'start',
					}}
					className="mt-4"
				>
					{albums.length === 0 && <div className="text-lg font-semibold">{t('translation.nomore')}</div>}
					{albums && (
						<CarouselContent>
							{albums.map((rec) => (
								<CarouselItem key={rec.name} className="md:basis-1/2 lg:basis-60 py-2">
									<Card className="rounded-md border-none shadow-sm">
										<CardContent className="flex aspect-square items-end justify-start p-6 relative">
											<Link to={`/album/${rec.id}`} className="contents">
												<img
													src={`${api.staticURL}/albums/${rec.cover}`}
													alt={`Album ${rec.name}`}
													className="absolute w-full h-full object-cover object-center top-0 left-0 rounded-t-md"
												/>
											</Link>
										</CardContent>
										<CardFooter className="border border-t-0 rounded-bl-md rounded-br-md p-0">
											<Link
												to={`/album/${rec.id}`}
												className="flex w-full h-full flex-col items-start px-4 py-2"
											>
												<span className="text-base font-semibold">{rec.name}</span>
												<span className="text-sm font-semibold">
													{rec.artists.map((artist: Artist) => artist.nickname).join(', ')}
												</span>
											</Link>
										</CardFooter>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
					)}
				</Carousel>
			</div>
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
		</div>
	)
}

export default AlbumPage
