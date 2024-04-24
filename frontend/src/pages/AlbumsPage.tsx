import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
	Album,
	ChevronDown,
	ChevronUp,
	Disc3,
	Headphones,
	Library,
	ListMusic,
	Settings,
	Star,
	User,
} from 'lucide-react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import axios from 'axios'
import Sidebar from '@/components/Sidebar'
// import albumsData from './albums.json'

// const languages = [
// 	{ label: 'English', value: 'en' },
// 	{ label: 'French', value: 'fr' },
// 	{ label: 'German', value: 'de' },
// 	{ label: 'Spanish', value: 'es' },
// 	{ label: 'Portuguese', value: 'pt' },
// 	{ label: 'Russian', value: 'ru' },
// 	{ label: 'Japanese', value: 'ja' },
// 	{ label: 'Korean', value: 'ko' },
// 	{ label: 'Chinese', value: 'zh' },
// ]

interface Album {
	id: number
	name: string
	cover: string
	rating: number
	artists: Artist[]
}

interface Artist {
	id: number
	nickname: string
	first_name: string
	last_name: string
	surname: string
	bio: string
	avatar: string
}

interface Genre {
	name: string
}

const AlbumsPage = () => {
	const [open, setOpen] = useState(false)
	const [open1, setOpen1] = useState(false)
	const [open2, setOpen2] = useState(false)
	const [open3, setOpen3] = useState(false)
	const [selectedGenre, setGenre] = useState('')
	const [selectedArtist, setArtist] = useState('')

	const [albums, setAlbums] = useState<Album[]>([])
	const [genres, setGenres] = useState<Genre[]>([])
	const [artists, setArtists] = useState<Artist[]>([])

	useEffect(() => {
		fetch('http://localhost:3001/api/records')
			.then((response) => response.json())
			.then((data) => setAlbums(data.records))
			.catch((error) => console.error('Ошибка в поиске альбомов:', error))
	}, [])

	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const response = await axios.get<{ artists: Artist[] }>('http://localhost:3001/api/artists')
				setArtists(response.data.artists)
			} catch (error) {
				console.error('Ошибка в поиске артистов:', error)
			}
		}
		fetchArtists()
	}, [])

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await axios.get('http://localhost:3001/api/genres')
				setGenres(response.data.genres)
			} catch (error) {
				console.error('Ошибка в поиске жанров:', error)
			}
		}
		fetchGenres()
	}, [])

	return (
		<div className="h-full grid grid-cols-[20rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-4">
			<div className="col-span-1 row-span-4">
				<Sidebar />
			</div>

			<div className="col-span-8 row-span-4">
				<div className="h-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-12 gap-2">
					<div className="col-span-8 row-span-1 px-4 py-2 grid grid-cols-12 grid-rows-1 w-full h-full items-center justify-between gap-x-4">
						<Input
							type="search"
							placeholder="Search"
							className="min-[1600px]:col-span-8 min-[1200px]:col-span-6 sm:col-span-2"
						/>
						<div className="col-span-4 flex items-center justify-end gap-10">
							<div className="flex items-center gap-4">
								<div>
									<Popover open={open} onOpenChange={setOpen}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={open}
												className="justify-between"
											>
												Alphabet
												<CaretSortIcon className="ml-2 h-5 w-5 shrink-0 opacity-90" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandList>
													<CommandGroup>
														<CommandItem className="flex items-center gap-1">
															<ChevronUp className="h-5 w-5 shrink-0 opacity-90" />
															Asc
														</CommandItem>
														<CommandItem className="flex items-center gap-1">
															<ChevronDown className="h-5 w-5 shrink-0 opacity-90" />
															Desc
														</CommandItem>
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
								<div>
									<Popover open={open1} onOpenChange={setOpen1}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={open1}
												className="justify-between"
											>
												Year
												<CaretSortIcon className="ml-2 h-5 w-5 shrink-0 opacity-90" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandList>
													<CommandGroup>
														<CommandItem className="flex items-center gap-1">
															<ChevronUp className="h-5 w-5 shrink-0 opacity-90" />
															Asc
														</CommandItem>
														<CommandItem className="flex items-center gap-1">
															<ChevronDown className="h-5 w-5 shrink-0 opacity-90" />
															Desc
														</CommandItem>
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
							</div>
							<div className="flex items-center gap-4">
								{/* <div>
									<Popover open={open2} onOpenChange={setOpen2}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												className={cn('justify-between', value && 'text-muted-foreground')}
											>
												{value
													? languages.find((language) => language.value === value)?.label
													: 'Genre'}
												<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search framework..." />
												<CommandEmpty>No framework found.</CommandEmpty>
												<CommandList>
													<CommandGroup>
														{languages.map((language) => (
															<CommandItem
																value={language.label}
																key={language.value}
																onSelect={() => {
																	setValue(language.value)
																}}
															>
																{language.label}
																<CheckIcon
																	className={cn(
																		'ml-auto h-4 w-4',
																		language.value === value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div> */}
								{/* <div>
									<Popover open={open3} onOpenChange={setOpen3}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												className={cn('justify-between', value && 'text-muted-foreground')}
											>
												{value
													? languages.find((language) => language.value === value)?.label
													: 'Artist'}
												<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search framework..." />
												<CommandEmpty>No framework foundук.</CommandEmpty>
												<CommandList>
													<CommandGroup>
														{languages.map((language) => (
															<CommandItem
																value={language.label}
																key={language.value}
																onSelect={() => {
																	setValue(language.value)
																}}
															>
																{language.label}
																<CheckIcon
																	className={cn(
																		'ml-auto h-4 w-4',
																		language.value === value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div> */}
								<div>
									<Popover open={open2} onOpenChange={setOpen2}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'justify-between',
													selectedGenre && 'text-muted-foreground'
												)}
											>
												{selectedGenre ? selectedGenre : 'Genre'}
												<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search genre..." />
												<CommandEmpty>No genre found.</CommandEmpty>
												<CommandList>
													<CommandGroup>
														{genres.map((genre) => (
															<CommandItem
																value={genre.name}
																key={genre.name}
																onSelect={() => {
																	setGenre(genre.name)
																}}
															>
																{genre.name}
																<CheckIcon
																	className={cn(
																		'ml-auto h-4 w-4',
																		genre.name === selectedGenre
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
								<div>
									<Popover open={open3} onOpenChange={setOpen3}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'justify-between',
													selectedArtist && 'text-muted-foreground'
												)}
											>
												{selectedArtist ? selectedArtist : 'Artist'}
												<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search artist..." />
												<CommandEmpty>No framework found.</CommandEmpty>
												<CommandList>
													<CommandGroup>
														{artists.map((artist) => (
															<CommandItem
																value={artist.nickname}
																key={artist.id}
																onSelect={() => {
																	setArtist(artist.nickname)
																}}
															>
																{artist.nickname}
																<CheckIcon
																	className={cn(
																		'ml-auto h-4 w-4',
																		artist.nickname === selectedArtist
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="col-span-8 row-span-11 grid grid-cols-5 auto-rows-min gap-6 px-4 py-4 pt-0">
							{albumsData.map((album) => (
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
											<span className="text-base font-semibold">{album.name}</span>
											<span className="text-sm font-semibold">{album.artist}</span>
											<span className="text-sm font-semibold">{album.date}</span>
											<span className="text-sm font-semibold">{album.name}</span>
										</Link>
									</CardFooter>
								</Card>
							))}

					</div> */}
					<div className="col-span-8 row-span-11 grid grid-cols-5 auto-rows-min gap-6 px-4 py-4 pt-0">
						{albums.map((album) => (
							<Card key={album.id} className="rounded-md border-none shadow-sm">
								<CardContent className="flex aspect-square items-end justify-start p-6 relative">
									<Link to={`/album/${album.id}`} className="contents">
										<img
											src={album.cover}
											alt={`Album ${album.name}`}
											className="absolute w-full h-full object-cover object-center top-0 left-0 rounded-t-md"
										/>
									</Link>
								</CardContent>
								<CardFooter className="border border-t-0 rounded-bl-md rounded-br-md p-0">
									<Link
										to={`/item/${album.id}`}
										className="flex w-full h-full flex-col items-start px-4 py-2"
									>
										<span className="text-base font-semibold">{album.name}</span>
										<span className="text-sm font-semibold">
											{album.artists.map((artist: Artist) => artist.nickname).join(', ')}
										</span>
									</Link>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AlbumsPage
