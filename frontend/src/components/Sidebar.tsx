import { NavLink } from 'react-router-dom'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@components/ui/navigation-menu'
import { Separator } from '@components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useTheme } from '@/components/ThemeProvider'
import { Album, Disc3, Headphones, Home, Library, ListMusic, Moon, Settings, Star, Sun, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
	const [t, i18n] = useTranslation('global')
	const { setTheme, theme } = useTheme()

	const handleChangeLanguage = (lang: string) => {
		i18n.changeLanguage(lang)
	}

	return (
		<div className="h-full grid max-w-xs grid-cols-[20rem_min-content] ">
			<div>
				<div className="p-4 flex flex-col gap-4 items-start w-full">
					<div className="w-full flex gap-4">
						<Tabs
							defaultValue={i18n.language}
							className="w-full"
							onValueChange={(value) => handleChangeLanguage(value)}
						>
							<TabsList className="w-full">
								<TabsTrigger className="w-full" value="ru">
									RU
								</TabsTrigger>
								<TabsTrigger className="w-full" value="en">
									EN
								</TabsTrigger>
							</TabsList>
						</Tabs>
						<Tabs defaultValue={theme} className="w-full">
							<TabsList className="w-full">
								<TabsTrigger className="w-full" value="dark" onClick={() => setTheme('dark')}>
									<Moon className="h-5 w-5" />
								</TabsTrigger>
								<TabsTrigger className="w-full" value="light" onClick={() => setTheme('light')}>
									<Sun className="h-5 w-5" />
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-4">{t('translation.menu')}</h4>
					<NavigationMenu orientation="vertical" className="max-w-full [&>*]:w-full items-start w-full">
						<NavigationMenuList className="flex-col items-start space-x-0 w-full gap-2">
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  [&.active]:bg-accent`}
								>
									<NavLink to={'/'}>
										<Home className="h-5 w-5" />
										{t('translation.home')}
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  [&.active]:bg-accent`}
								>
									<NavLink to={'/profile'}>
										<User className="h-5 w-5" />
										{t('translation.profile')}
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
										{t('translation.settings')}
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
										{t('translation.favorites')}
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
										{t('translation.myCollection')}
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
										{t('translation.recommendations')}
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
										{t('translation.blog')}
									</NavLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="p-4 flex flex-col gap-4 items-start">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-4">
						{t('translation.database')}
					</h4>
					<NavigationMenu orientation="vertical" className="max-w-full [&>*]:w-full items-start w-full">
						<NavigationMenuList className="flex-col items-start space-x-0 w-full gap-2">
							<NavigationMenuItem className="w-full">
								<NavigationMenuLink
									asChild
									className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent data-[state=open]:bg-accent/50 [&.active]:bg-accent`}
								>
									<NavLink to={'/albums'}>
										<Library className="h-5 w-5" />
										{t('translation.albums')}
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
										{t('translation.artists')}
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
