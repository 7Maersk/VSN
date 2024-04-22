import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { Separator } from '@/components/ui/separator'
import { Album, Disc3, Headphones, Library, ListMusic, Settings, Star, User } from 'lucide-react'

import albumsData from './albums.json'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Link } from 'react-router-dom'

//TODO: Добавить react router dom

const MainPage = ({}) => {
	return (
		<div className="h-full grid grid-cols-[20rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-4 gap-2">
			<div className="col-span-1 row-span-4">
				<div className="h-full grid max-w-xs grid-cols-[20rem_min-content] ">
					<div>
						<div className="p-4 flex flex-col gap-4 items-start">
							<h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-4">Menu</h4>
							<NavigationMenu
								orientation="vertical"
								className="max-w-full [&>*]:w-full items-start w-full"
							>
								<NavigationMenuList className="flex-col items-start space-x-0 w-full gap-2">
									<NavigationMenuItem className="w-full">
										<div className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<User className="h-5 w-5" />
												Profile
											</NavigationMenuLink>
										</div>
									</NavigationMenuItem>
									<NavigationMenuItem className="w-full">
										<div className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<Settings className="h-5 w-5" />
												Settings
											</NavigationMenuLink>
										</div>
									</NavigationMenuItem>
									<NavigationMenuItem className="w-full">
										<div className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<Star className="h-5 w-5" />
												Favorites
											</NavigationMenuLink>
										</div>
									</NavigationMenuItem>
									<NavigationMenuItem className="w-full">
										<div className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<ListMusic className="h-5 w-5" />
												My collection
											</NavigationMenuLink>
										</div>
									</NavigationMenuItem>
									<NavigationMenuItem className="w-full">
										<div className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<Disc3 className="h-5 w-5" />
												Recomendations
											</NavigationMenuLink>
										</div>
									</NavigationMenuItem>
									<NavigationMenuItem className="w-full">
										<div className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<Album className="h-5 w-5" />
												Blog
											</NavigationMenuLink>
										</div>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
						<div className="p-4 flex flex-col gap-4 items-start">
							<h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-4">Database</h4>
							<NavigationMenu
								orientation="vertical"
								className="max-w-full [&>*]:w-full items-start w-full"
							>
								<NavigationMenuList className="flex-col items-start space-x-0 w-full gap-2">
									<NavigationMenuItem className="w-full">
										<Link to={'/albums'} className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<Library className="h-5 w-5" />
												Albums
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
									<NavigationMenuItem className="w-full">
										<Link to={'/artists'} className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<Headphones className="h-5 w-5" />
												Artists
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>

					<Separator orientation="vertical" />
				</div>
			</div>

			<div className="col-span-8 row-span-4">
				<div className="h-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-12 gap-4">
					{/* сверху слева новостей добавить надпись Последние новости */}
					<div className="col-start-2 col-end-6 row-start-2 row-end-8 relative">
						<img
							src="https://cdnn21.img.ria.ru/images/07e5/08/12/1746226187_0:22:3071:1749_1920x0_80_0_0_8952d3e406e75032fec31f71cef5abee.jpg"
							alt="Post preview"
							className="rounded-md object-cover w-full h-full object-center"
						/>
						<div className="absolute z-10 bg-gradient-to-t from-black w-full h-full top-0 left-0 rounded-md"></div>

						<h3 className="absolute z-20 bottom-0 left-0 px-8 py-12 text-white scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
							Nadezhda Babkina on world tour
						</h3>
					</div>
					<div className="col-start-6 col-end-8 row-start-2 row-end-8">
						<div className="grid grid-cols-2 grid-rows-2 h-full w-full grid-flow-col gap-4">
							<div className="col-span-2 relative">
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3pKNHPLzPTyFUk0vbMcnqgK_hQ0P1PUEoAaV0PtjYRc4krv1F"
									alt="Post preview"
									className="rounded-md object-cover w-full h-full object-left-top"
								/>
								<div className="absolute z-10 bg-gradient-to-t from-black w-full h-full top-0 left-0 rounded-md"></div>

								<h4 className="absolute z-20 bottom-0 left-0 px-4 py-6 text-white scroll-m-20 text-xl font-semibold tracking-tight">
									Valery Meladze stole a car?
								</h4>
							</div>
							<div className="col-span-2 relative">
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJgYwm907WdY0ZKplzxRYITVnCrchmI67DabdR1OEf6WhdqjLs"
									alt="Post preview"
									className="rounded-md object-cover w-full h-full object-left-top"
								/>
								<div className="absolute z-10 bg-gradient-to-t from-black w-full h-full top-0 left-0 rounded-md"></div>

								<h4 className="absolute z-20 bottom-0 left-0 px-4 py-6 text-white scroll-m-20 text-xl font-semibold tracking-tight">
									Pugacheva about Russia, music and fame
								</h4>
							</div>
						</div>
					</div>
					{/* сверху слева релизов добавить надпись Последние релизы */}
					<div className="col-start-2 col-end-8 row-start-8 row-end-9">
						<div className="grid grid-cols-6 grid-rows-[min-content_1fr] gap-y-2 mt-2">
							<h3 className="col-span-6 scroll-m-20 text-2xl font-semibold tracking-tight">
								New releases
							</h3>
							<div className="col-span-6">
								<Carousel
									opts={{
										align: 'start',
									}}
									className="w-full "
								>
									<CarouselContent>
										{albumsData.map((album) => (
											<CarouselItem key={album.name} className="md:basis-1/2 lg:basis-60 py-2">
												<Card className="rounded-md border-none shadow-sm">
													<CardContent className="flex aspect-square items-end justify-start p-6 relative">
														<Link to={'/item'} className="contents">
															<img
																src={album.img}
																alt={`Album ${album.name}`}
																className="absolute w-full h-full object-cover object-center top-0 left-0 rounded-t-md"
															/>
														</Link>
													</CardContent>
													<CardFooter className="border border-t-0 rounded-bl-md rounded-br-md p-0">
														<Link
															to={'/item'}
															className="flex w-full h-full flex-col items-start px-4 py-2"
														>
															<span className="text-base font-semibold">
																{album.name}
															</span>
															<span className="text-sm font-semibold">
																{album.artist}
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

						{/* 						
						<Carousel responsive={responsive} infinite={true}>
							{albums.map((album, index) => (
								<div className="card" style={{ padding: '10px', userSelect: 'none' }} key={index}>
									<a href='https://www.npmjs.com/package/react-multi-carousel'>
										{/* нужно сделать, чтобы картинка принимала размер изначального изображения в карте, чтобы не было разных размеров альбомов 
										<img className='album--image rounded-md object-cover w-full h-full object-left-top' src={album.img} alt={album.name} 
										style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
									</a>
									<h2>{album.name}</h2>
									<p>{album.artist}</p>
									<p>{album.date}</p>
								</div>
							))}
						</Carousel> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainPage
