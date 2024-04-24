import { NavLink } from 'react-router-dom'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@components/ui/navigation-menu'
import { Separator } from '@components/ui/separator'
import { Album, Disc3, Headphones, Library, ListMusic, Settings, Star, User } from 'lucide-react'

const Sidebar = () => {
	return (
		<div className="h-full grid max-w-xs grid-cols-[20rem_min-content] ">
			<div>
				<div className="p-4 flex flex-col gap-4 items-start">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-4">Menu</h4>
					<NavigationMenu orientation="vertical" className="max-w-full [&>*]:w-full items-start w-full">
						<NavigationMenuList className="flex-col items-start space-x-0 w-full gap-2">
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  [&.active]:bg-accent`}
								>
									<NavLink to={'/profile'}>
										<User className="h-5 w-5" />
										Profile
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  [&.active]:bg-accent`}
								>
									<NavLink to={'/settings'}>
										<Settings className="h-5 w-5" />
										Settings
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  [&.active]:bg-accent`}
								>
									<NavLink to={'/favorites'}>
										<Star className="h-5 w-5" />
										Favorites
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  [&.active]:bg-accent`}
								>
									<NavLink to={'/collection'}>
										<ListMusic className="h-5 w-5" />
										My collection
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  [&.active]:bg-accent`}
								>
									<NavLink to={'/recommendation'}>
										<Disc3 className="h-5 w-5" />
										Recommendations
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  [&.active]:bg-accent`}
								>
									<NavLink to={'/blog'}>
										<Album className="h-5 w-5" />
										Blog
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="p-4 flex flex-col gap-4 items-start">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-4">Database</h4>
					<NavigationMenu orientation="vertical" className="max-w-full [&>*]:w-full items-start w-full">
						<NavigationMenuList className="flex-col items-start space-x-0 w-full gap-2">
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent data-[state=open]:bg-accent/50 [&.active]:bg-accent`}
								>
									<NavLink to={'/albums'}>
										<Library className="h-5 w-5" />
										Albums
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 [&.active]:bg-accent`}
								>
									<NavLink to={'/artists'}>
										<Headphones className="h-5 w-5" />
										Artists
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>

			<Separator orientation="vertical" />
		</div>
	)
}

export default Sidebar
