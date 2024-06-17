import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { api } from '@/api/api.config'
import { Album, Albums, Artist, Comment } from '@/types'
import useAuth from '@/store/auth.store'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { isAxiosError } from 'axios'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

const AlbumPage = () => {
	const { id } = useParams<{ id: string }>() as { id: string }
	const [album, setAlbum] = useState<Album | null>(null)
	const [albums, setAlbums] = useState<Albums[]>([])
	const { user } = useAuth()
	const [commentText, setCommentText] = useState('')
	const [comments, setComments] = useState<Comment[]>([])

	const [favAlbums, setFavAlbums] = useState<number[]>([])

	const { toast } = useToast()

	const [t] = useTranslation('global')

	const handleCommentSubmit = async () => {
		if (commentText.trim()) {
			// try {
			api.createComment({
				datetime: new Date().toISOString(),
				text: commentText,
				user_id: user!.id || 1,
				post_id: '',
				record_id: id,
				nickname: user?.nickname || '',
			})
				.then((comment) => {
					setComments([...comments, comment])
					setCommentText('')
				})
				.catch((err) => {
					let msg = undefined
					if (isAxiosError(err) && err.response?.status === 401) {
						msg = err.response?.data.message
						toast({
							duration: 2000,
							variant: 'destructive',
							title: 'О нет! Что-то пошло не так',
							description: `Вы не авторизованы`,
						})
					} else {
						toast({
							duration: 2000,
							variant: 'destructive',
							title: 'О нет! Что-то пошло не так',
							description: `Ошибка сервера`,
						})
					}
				})

			// } catch (error) {
			// console.error('Ошибка при добавлении комментария:', error)
			// }
		}
	}

	const handleAddToFavorites = async () => {
		await api
			.addToFavorites(user?.id || 0, Number(id))
			.then(() => {
				toast({
					duration: 2000,
					title: 'Всё отлично!',
					description: 'Пластинка добавлена в избранное',
				})
				setFavAlbums([...favAlbums, Number(id)])
			})
			.catch((err) => {
				let msg = undefined
				if (isAxiosError(err)) msg = err.response?.data.message
				toast({
					duration: 2000,
					variant: 'destructive',
					title: 'О нет! Что-то пошло не так',
					description: `${msg}`,
				})
			})
	}

	// Добавить в api метод для удаления
	const handleRemoveFromFav = () => {
		// await api
		// 	.addToFavorites(user?.id || 0, Number(id))
		// 	.then(() => {
		// 		toast({
		// 			duration: 2000,
		// 			title: 'Всё отлично!',
		// 			description: 'Пластинка удалена из избранного',
		// 		})
		//		 setFavAlbums(favAlbums.filter(f => f !== Number(id)))
		// 	})
		// 	.catch((err) => {
		// 		let msg = undefined
		// 		if (isAxiosError(err)) msg = err.response?.data.message
		// 		toast({
		// 			duration: 2000,
		// 			variant: 'destructive',
		// 			title: 'О нет! Что-то пошло не так',
		// 			description: `${msg}`,
		// 		})
		// 	})
	}

	const handleAddToCollection = async () => {
		await api
			.addToCollection(user?.id || 0, Number(id))
			.then(() => {
				toast({
					duration: 2000,
					title: 'Всё отлично!',
					description: 'Пластинка добавлена в коллекцию',
				})
			})
			.catch((err) => {
				let msg = undefined
				if (isAxiosError(err)) msg = err.response?.data.message
				toast({
					duration: 2000,
					variant: 'destructive',
					title: 'О нет! Что-то пошло не так',
					description: `${msg}`,
				})
			})
	}

	useEffect(() => {
		api.getRecord(id || '1')
			.then((album: Album | null) => {
				setAlbum(album)
				return api.getArtistRecord(id || '1')
			})
			.then((nickname) => {
				return api.getRecordsArtist(nickname)
			})
			.then((albums: Albums[]) => {
				setAlbums(albums.filter((el) => el.id !== Number(id)))
			})
			.catch((error) => console.error('Ошибка при загрузке данных:', error))
	}, [id])

	useEffect(() => {
		api.getComments({ type: 'record_id', id: Number(id) }).then((comments) => {
			setComments(comments)
		})
	}, [id])

	useEffect(() => {
		api.getFavoriteCollection(user?.id || 0).then((result) => {
			setFavAlbums(result.map((r) => r.id))
		})
	}, [])

	if (!album) {
		return <div>404</div>
	}

	if (!albums) {
		return <div>{t('translation.nomore')}</div>
	}

	return (
		<div className="col-span-8 row-span-12 px-4 py-4 overflow-auto">
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<img
						className="aspect-square object-cover object-center rounded-md max-w-xs"
						src={`${api.staticURL}/albums/${album.cover}`}
						alt={`Album ${album.name}`}
					/>
					<div className="border rounded-md p-4 w-full flex flex-col gap-4">
						<h2 className="flex items-center gap-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
							{album.name}
							{favAlbums.find((f) => f === Number(id)) ? (
								<Star fill="gold" onClick={handleRemoveFromFav} />
							) : (
								<Star onClick={handleAddToFavorites} />
							)}
						</h2>

						<p className="leading-7">
							<b>{t('translation.date')}:</b> {album.release_date}
						</p>
						<p className="leading-7 ">
							<b>{t('translation.country')}:</b> {album.country.name}
						</p>
						<p className="leading-7 ">
							<b>{t('translation.catnumber')}:</b> {album.katalog_number}
						</p>
						<p className="leading-7">
							<b>{t('translation.rating')}:</b> {album.rating}
						</p>
						<p className="leading-7 ">
							<b>{t('translation.artists')}: </b>
							{album.artists.map((artist, index) => (
								<span key={artist.id}>
									<Link to={`/artist/${artist.id}`}>{artist.nickname}</Link>
									{index < album.artists.length - 1 && ', '}
								</span>
							))}
						</p>
						<p className="leading-7 [&:not(:first-child)]:mt-2">
							<b>{t('translation.genre')}:</b> {album.genres.map((genre) => genre.name).join(', ')}
						</p>

						<Button onClick={handleAddToCollection}>{t('translation.addtocollection')}</Button>
					</div>
				</div>

				<div className="mt-4 flex flex-col gap-4">
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">ПЕСНИ</h3>
					<Table>
						<TableCaption>A list of your recent invoices.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[256px] text-left">{t('translation.name')}</TableHead>
								<TableHead className="text-center">{t('translation.feat')}</TableHead>
								<TableHead className="text-center">{t('translation.duration')}</TableHead>
								<TableHead className="text-center">{t('translation.position')}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{album.songs.map((song) => (
								<TableRow key={song.id}>
									<TableCell className="font-medium text-left">{song.title}</TableCell>
									<TableCell className="text-center">
										{song.extraartists.length > 0
											? 'feat. ' + song.extraartists.map((a) => a.artist.nickname).join(', ')
											: ''}
									</TableCell>
									<TableCell className="text-center">
										{song.duration === 0 ? (
											''
										) : (
											<>
												{Math.floor(song.duration / 60) < 10
													? `0${Math.floor(song.duration / 60)}`
													: Math.floor(song.duration / 60)}
												:
												{Math.floor(song.duration % 60) < 10
													? `0${Math.floor(song.duration % 60)}`
													: Math.floor(song.duration % 60)}
											</>
										)}
									</TableCell>

									<TableCell className="text-center">{song.position}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
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
									<CarouselItem
										key={rec.name + Date.now() + Math.random() * Math.random() + Math.random()}
										className="md:basis-1/2 lg:basis-60 py-2"
									>
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
														{rec.artists
															.map((artist: Artist) => artist.nickname)
															.join(', ')}
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
						<Input
							type="text"
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
							placeholder={t('translation.add')}
							className="w-full p-2 border rounded-md"
						/>
						<Button onClick={handleCommentSubmit} className="mt-2 px-4 py-2 rounded-md">
							{t('translation.add')}
						</Button>

						<div className="mt-4">
							{comments.map((comment: any) => (
								<div key={comment.id} className="border p-2 rounded-md mt-2">
									<p>
										{t('translation.author')}:{' '}
										<Link to={`/user/${comment.user_id}`}>{comment.nickname}</Link>
									</p>
									<p>{comment.text}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AlbumPage
