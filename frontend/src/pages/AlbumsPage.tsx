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
import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const languages = [
	{ label: 'English', value: 'en' },
	{ label: 'French', value: 'fr' },
	{ label: 'German', value: 'de' },
	{ label: 'Spanish', value: 'es' },
	{ label: 'Portuguese', value: 'pt' },
	{ label: 'Russian', value: 'ru' },
	{ label: 'Japanese', value: 'ja' },
	{ label: 'Korean', value: 'ko' },
	{ label: 'Chinese', value: 'zh' },
]

import albumsData from './albums.json'

const AlbumsPage = () => {
	const [open, setOpen] = useState(false)
	const [open1, setOpen1] = useState(false)
	const [open2, setOpen2] = useState(false)
	const [open3, setOpen3] = useState(false)
	const [value, setValue] = useState('')

	return (
		<div className="h-full grid grid-cols-[20rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-4">
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
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
													1 ? 'bg-accent' : ''
												}`}
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
								<div>
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
								</div>
								<div>
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
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-8 row-span-11 grid grid-cols-5 auto-rows-min gap-6 px-4 py-4 pt-0">
						
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
						
					</div>
				</div>
			</div>
		</div>
	)
}

export default AlbumsPage
