import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

//TODO: Добавить react router dom

const MainPage = () => {
	return (
		<div className="p-4 w-full flex justify-between">
			<img
				className="aspect-square w-16"
				src="https://www.shutterstock.com/image-photo/black-vinyl-record-isolated-on-260nw-2312761911.jpg"
				alt="logo"
			/>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<div>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Коллекция</NavigationMenuLink>
						</div>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<div>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Избранное</NavigationMenuLink>
						</div>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<div>
							{/* <Button variant={'destructive'}>Выйти</Button> */}
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Выйти</NavigationMenuLink>
						</div>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}

export default MainPage
