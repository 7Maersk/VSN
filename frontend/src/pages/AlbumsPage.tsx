import { Button } from '@components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@components/ui/command'
import { Input } from '@components/ui/input'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@components/ui/card'

import Sidebar from '@components/Sidebar'
import { useTranslation } from 'react-i18next'
import { Albums, Artist, Genre } from '@/types'
import { api } from '@/api/api.config'

const AlbumsPage = () => {
	const [t] = useTranslation('global')

	const [open, setOpen] = useState(false)
	const [open1, setOpen1] = useState(false)
	const [open2, setOpen2] = useState(false)
	const [open3, setOpen3] = useState(false)
	const [selectedGenre, setGenre] = useState('')
	const [selectedArtist, setArtist] = useState('')

	const [albums, setAlbums] = useState<Albums[]>([])
	const [genres, setGenres] = useState<Genre[]>([])
	const [artists, setArtists] = useState<Artist[]>([])

	useEffect(() => {
		api.getArtists().then((artists: Artist[]) => setArtists(artists))
		api.getRecords().then((albums: Albums[]) => setAlbums(albums))
		api.getGenres().then((genres: Genre[]) => setGenres(genres))
	}, [])

	return (
		<>
			<div className="col-span-8 row-span-1 px-4 py-2 flex w-full h-full items-center justify-between gap-x-4">
				<Input type="search" placeholder={t('translation.search')} className="w-full" />

				<div className="flex gap-x-4 justify-end">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
								{t('translation.alphabet')}
								<CaretSortIcon className="ml-2 h-5 w-5 shrink-0 opacity-90" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandList>
									<CommandGroup>
										<CommandItem className="flex items-center gap-1">
											<ChevronUp className="h-5 w-5 shrink-0 opacity-90" />
											{t('translation.asc')}
										</CommandItem>
										<CommandItem className="flex items-center gap-1">
											<ChevronDown className="h-5 w-5 shrink-0 opacity-90" />
											{t('translation.desc')}
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

					<Popover open={open1} onOpenChange={setOpen1}>
						<PopoverTrigger asChild>
							<Button variant="outline" role="combobox" aria-expanded={open1} className="justify-between">
								{t('translation.year')}
								<CaretSortIcon className="ml-2 h-5 w-5 shrink-0 opacity-90" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandList>
									<CommandGroup>
										<CommandItem className="flex items-center gap-1">
											<ChevronUp className="h-5 w-5 shrink-0 opacity-90" />
											{t('translation.asc')}
										</CommandItem>
										<CommandItem className="flex items-center gap-1">
											<ChevronDown className="h-5 w-5 shrink-0 opacity-90" />
											{t('translation.desc')}
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

					<Popover open={open2} onOpenChange={setOpen2}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								className={cn('justify-between', selectedGenre && 'text-muted-foreground')}
							>
								{selectedGenre ? selectedGenre : t('translation.genre')}
								<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput placeholder={t('translation.searchgenre')} />
								<CommandEmpty>{t('translation.nogenre')}</CommandEmpty>
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
														genre.name === selectedGenre ? 'opacity-100' : 'opacity-0'
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

					<Popover open={open3} onOpenChange={setOpen3}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								className={cn('justify-between', selectedArtist && 'text-muted-foreground')}
							>
								{selectedArtist ? selectedArtist : t('translation.artist')}
								<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput placeholder={t('translation.searchartist')} />
								<CommandEmpty>{t('translation.noartist')}</CommandEmpty>
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
														artist.nickname === selectedArtist ? 'opacity-100' : 'opacity-0'
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
			<div className="col-span-8 row-span-11 grid grid-cols-5 auto-rows-min gap-6 px-4 py-4 pt-0">
				{albums.map((album: Albums) => (
					<Card key={album.id} className="rounded-md border-none shadow-sm">
						<CardContent className="flex aspect-square items-end justify-start p-6 relative">
							<Link to={`/album/${album.id}`} className="contents">
								<img
									src={`${api.staticURL}/albums/${album.cover}`}
									alt={`Album ${album.name}`}
									className="absolute w-full h-full object-cover object-center top-0 left-0 rounded-t-md"
								/>
							</Link>
						</CardContent>
						<CardFooter className="border border-t-0 rounded-bl-md rounded-br-md p-0">
							<Link
								to={`/album/${album.id}`}
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
		</>
	)
}

export default AlbumsPage
