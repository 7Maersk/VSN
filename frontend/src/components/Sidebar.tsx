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
import { Album, Disc3, Headphones, Home, Library, ListMusic, Moon, Settings, Star, Sun, User, MessageSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ReactElement, useState } from 'react'

const Sidebar = () => {
	const isLoggedIn = true
	const [t, i18n] = useTranslation('global')
	const { setTheme, theme } = useTheme()
	const [menuItems, setMenuItems] = useState<
		{ protected: boolean; text: string; link: string; menuGroup: 'database' | 'menu'; icon?: ReactElement }[]
	>([
		{
			protected: false,
			text: 'translation.albums',
			link: '/albums',
			menuGroup: 'database',
			icon: <Library className="h-5 w-5" />,
		},
		{
			protected: false,
			text: 'translation.artists',
			link: '/artists',
			menuGroup: 'database',
			icon: <Headphones className="h-5 w-5" />,
		},

		{
			protected: false,
			text: 'translation.home',
			link: '/',
			icon: <Home className="h-5 w-5" />,
			menuGroup: 'menu',
		},
		{
			protected: true,
			link: '/profile',
			text: 'translation.profile',
			icon: <User className="h-5 w-5" />,
			menuGroup: 'menu',
		},
		{
			protected: true,
			link: '/settings',
			text: 'translation.settings',
			icon: <Settings className="h-5 w-5" />,
			menuGroup: 'menu',
		},
		{
			protected: true,
			link: '/favorites',
			text: 'translation.favorites',
			icon: <Star className="h-5 w-5" />,
			menuGroup: 'menu',
		},
		{
			protected: true,
			link: '/collection',
			text: 'translation.myCollection',
			icon: <ListMusic className="h-5 w-5" />,
			menuGroup: 'menu',
		},
		{
			protected: true,
			link: '/recommendations',
			text: 'translation.recommendations',
			icon: <Disc3 className="h-5 w-5" />,
			menuGroup: 'menu',
		},
		{
			protected: false,
			link: '/blog',
			text: 'translation.blog',
			icon: <Album className="h-5 w-5" />,
			menuGroup: 'menu',
		},
		{
			protected: false,
			link: '/threads',
			text: 'translation.thread',
			icon: <MessageSquare className="h-5 w-5" />,
			menuGroup: 'menu',
		},
	])

	const handleChangeLanguage = (lang: string) => {
		i18n.changeLanguage(lang)
	}

	return (
		<div className="h-full grid max-w-xs grid-cols-[20rem_min-content] ">
			<div>
				<div className="p-4 flex flex-col gap-4 items-start w-full">
					<div className="w-full flex flex-col gap-4">
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
								<TabsTrigger className="w-full" value="light" onClick={() => setTheme('light')}>
									<Sun className="h-5 w-5" />
								</TabsTrigger>
								<TabsTrigger className="w-full" value="dark" onClick={() => setTheme('dark')}>
									<Moon className="h-5 w-5" />
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-4">{t('translation.menu')}</h4>
					<NavigationMenu orientation="vertical" className="max-w-full [&>*]:w-full items-start w-full">
						<NavigationMenuList className="flex-col items-start space-x-0 w-full gap-2">
							{menuItems
								.filter((item) => item.menuGroup === 'menu')
								.map((item) => {
									if (item.protected) {
										if (isLoggedIn) {
											return (
												<NavigationMenuItem key={item.text} className="w-full">
													<NavigationMenuLink
														asChild
														className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[state=open]:bg-primary/50 [&.active]:bg-primary/50`}
													>
														<NavLink to={item.link}>
															{item.icon}
															{t(item.text)}
														</NavLink>
													</NavigationMenuLink>
												</NavigationMenuItem>
											)
										} else {
											return null
										}
									}

									return (
										<NavigationMenuItem className="w-full" key={item.text}>
											<NavigationMenuLink
												asChild
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[state=open]:bg-accent/50  [&.active]:bg-primary/50`}
											>
												<NavLink to={item.link}>
													{item.icon}
													{t(item.text)}
												</NavLink>
											</NavigationMenuLink>
										</NavigationMenuItem>
									)
								})}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="p-4 flex flex-col gap-4 items-start">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-4">
						{t('translation.database')}
					</h4>
					<NavigationMenu orientation="vertical" className="max-w-full [&>*]:w-full items-start w-full">
						<NavigationMenuList className="flex-col items-start space-x-0 w-full gap-2">
							{menuItems
								.filter((item) => item.menuGroup === 'database')
								.map((item) => {
									return (
										<NavigationMenuItem className="w-full" key={item.text}>
											<NavigationMenuLink
												asChild
												className={`gap-4 w-full group inline-flex h-9 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent data-[state=open]:bg-accent/50 [&.active]:bg-primary/50`}
											>
												<NavLink to={item.link}>
													{item.icon}
													{t(item.text)}
												</NavLink>
											</NavigationMenuLink>
										</NavigationMenuItem>
									)
								})}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>

			<Separator orientation="vertical" />
		</div>
	)
}

export default Sidebar
