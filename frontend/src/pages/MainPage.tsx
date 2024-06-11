import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import { useTranslation } from 'react-i18next'
import { api } from '@/api/api.config'
import { useEffect, useState } from 'react'
import { Albums, Post } from '@/types'

const MainPage = () => {
	const [t] = useTranslation('global')

	const [albums, setAlbums] = useState<Albums[]>([])
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		api.getRecords().then((albums: Albums[]) => setAlbums(albums))
		api.getPosts().then((posts: Post[]) => setPosts(posts))
	}, [])

	return (
		<>
			{posts.length > 0 && (
				<>
					<Link to={`/post/${posts[posts.length - 1].id}`} className="col-start-2 col-end-6 row-start-2 row-end-8 relative">
						<img
							src={`${api.staticURL}/images/${posts[posts.length - 1].img}`}
							alt={posts[posts.length - 1].name}
							className="rounded-md object-cover w-full h-full object-center"
						/>
						<div className="absolute z-10 bg-gradient-to-t from-black w-full h-full top-0 left-0 rounded-md"></div>
						<h3 className="absolute z-20 bottom-0 left-0 px-8 py-12 text-white scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
							{posts[posts.length - 1].name}
						</h3>
					</Link>

					<div className="col-start-6 col-end-8 row-start-2 row-end-8">
						<div className="grid grid-cols-2 grid-rows-2 h-full w-full grid-flow-col gap-4">
							{posts.length > 1 && (
								<Link to={`/post/${posts[posts.length - 2].id}`} className="col-span-2 relative">
									<img
										src={`${api.staticURL}/images/${posts[posts.length - 2].img}`}
										alt={posts[posts.length - 2].name}
										className="rounded-md object-cover w-full h-full object-left-top"
									/>
									<div className="absolute z-10 bg-gradient-to-t from-black w-full h-full top-0 left-0 rounded-md"></div>
									<h4 className="absolute z-20 bottom-0 left-0 px-4 py-6 text-white scroll-m-20 text-xl font-semibold tracking-tight">
										{posts[posts.length - 2].name}
									</h4>
								</Link>
							)}
							{posts.length > 2 && (
								<Link to={`/post/${posts[posts.length - 3].id}`} className="col-span-2 relative">
									<img
										src={`${api.staticURL}/images/${posts[posts.length - 3].img}`}
										alt={posts[posts.length - 3].name}
										className="rounded-md object-cover w-full h-full object-left-top"
									/>
									<div className="absolute z-10 bg-gradient-to-t from-black w-full h-full top-0 left-0 rounded-md"></div>
									<h4 className="absolute z-20 bottom-0 left-0 px-4 py-6 text-white scroll-m-20 text-xl font-semibold tracking-tight">
										{posts[posts.length - 3].name}
									</h4>
								</Link>
							)}
						</div>
					</div>
				</>
			)}

			<div className="col-start-2 col-end-8 row-start-8 row-end-9">
				<div className="grid grid-cols-6 grid-rows-[min-content_1fr] gap-y-2 mt-2">
					<h3 className="col-span-6 scroll-m-20 text-2xl font-semibold tracking-tight">
						{t('translation.lastreleases')}
					</h3>
					<div className="col-span-6">
						<Carousel
							opts={{
								align: 'start',
							}}
							className="w-full "
						>
							<CarouselContent>
								{albums
									.slice(-10)
									.map((rec) => (
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
															{rec.artists.map((artist) => artist.nickname).join(', ')}
														</span>
													</Link>
												</CardFooter>
											</Card>
										</CarouselItem>
									))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>
				</div>
			</div>
		</>
	)
}

export default MainPage
