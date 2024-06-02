import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { api } from '@/api/api.config'
import { Albums, Artist } from '@/types'

const ArtistPage = () => {
	const { id } = useParams<{ id: string }>()
	const [artist, setArtist] = useState<Artist | null>(null)
	const [albums, setAlbums] = useState<Albums[]>([])

	const [t] = useTranslation('global')

	useEffect(() => {
		api.getArtist(id || '1').then((artist) => setArtist(artist))
		api.getRecordsArtistId(id || '1').then((albums: Albums[]) => {
			setAlbums(albums)
		})
	}, [id])

	if (!artist) {
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
					src={`${api.staticURL}/artists/${artist.avatar}`}
					alt={`Album ${artist.nickname}`}
				/>
				<div className="border rounded-md p-4">
					<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
						{artist.nickname}
					</h2>
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6">
						<span className="mr-2">Имя:</span>
						<span>
							{artist.first_name} {artist.surname} {artist.last_name}
						</span>
					</h3>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						<span className="text-lg font-semibold mr-2">Bio:</span>
						{artist.bio}
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
										<CardFooter className="border border-t-0 rounded-bl-md rounded-br-md py-2 px-4 min-h-32 flex flex-col items-start justify-between">
											<Link
												to={`/album/${rec.id}`}
												className="w-full h-full"
											>
												<span className="text-base font-semibold">{rec.name}</span>
											</Link>
											<Link
												to={`/album/${rec.id}`}
												className="w-full h-full mt-1"
											>
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
		</div>
	)
}

export default ArtistPage
