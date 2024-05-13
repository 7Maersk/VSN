import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

import { api } from '../api/api.config'
import { Artist } from '@/types'

const ArtistsPage = () => {
	const [t] = useTranslation('global')

	const [open, setOpen] = useState(false)

	const [artists, setArtists] = useState<Artist[]>([])

	useEffect(() => {
		api.getArtists().then((artists) => {
			setArtists(artists)
		})
	}, [])

	return (
		<>
			<div className="col-span-8 row-span-1 px-4 py-2 flex w-full h-full items-center justify-between gap-x-4">
				<Input type="search" placeholder={t('translation.search')} />

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
			</div>
			<div className="col-span-8 row-span-11 grid grid-cols-5 auto-rows-min gap-6 px-4 py-4 pt-0">
				{artists.map((artist: Artist) => (
					<Card key={artist.id} className="rounded-md border-none shadow-sm">
						<CardContent className="flex aspect-square items-end justify-start p-6 relative">
							<Link to={`/artist/${artist.id}`} className="contents">
								<img
									src={`${api.staticURL}/artists/${artist.avatar}`}
									alt={`Avatar of ${artist.nickname}`}
									className="absolute w-full h-full object-cover object-center top-0 left-0 rounded-t-md"
								/>
							</Link>
						</CardContent>
						<CardFooter className="border border-t-0 rounded-bl-md rounded-br-md p-0">
							<Link
								to={`/artist/${artist.id}`}
								className="flex w-full h-full flex-col items-start px-4 py-2"
							>
								<span className="text-base font-semibold">{artist.nickname}</span>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	)
}

export default ArtistsPage
