import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { Separator } from '@/components/ui/separator'
import { Album, Disc3, Headphones, Library, ListMusic, Settings, Star, User } from 'lucide-react'

//TODO: Добавить react router dom

const MainPage = () => {
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
										<div className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<Library className="h-5 w-5" />
												Albums
											</NavigationMenuLink>
										</div>
									</NavigationMenuItem>
									<NavigationMenuItem className="w-full">
										<div className="cursor-pointer w-full">
											<NavigationMenuLink
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`}
											>
												<Headphones className="h-5 w-5" />
												Artists
											</NavigationMenuLink>
										</div>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>

					<Separator orientation="vertical" />
				</div>
			</div>

			<div className="col-span-8 row-span-4">
				<div className="h-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-8 gap-2">
					<div className="col-start-2 col-end-6 row-start-2 row-end-6 relative">
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
					<div className="col-start-6 col-end-8 row-start-2 row-end-6">
						<div className="grid grid-cols-2 grid-rows-2 h-full w-full grid-flow-col gap-2">
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
				</div>
			</div>
		</div>
	)
}

export default MainPage
