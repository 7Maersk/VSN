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

		<div className='h-full grid grid-cols-3 grid-rows-[min-content_1fr] '>
			<div className='col-span-3'>Header</div>
			<div className='row-span-2'>Sidebar</div>
			<div className='row-span-2 col-span-2'>Content</div>
		</div>

		// <div className="p-4 w-full flex justify-between">
		// 	<img
		// 		className="aspect-square w-16"
		// 		src="https://www.shutterstock.com/image-photo/black-vinyl-record-isolated-on-260nw-2312761911.jpg"
		// 		alt="logo"
		// 	/>
		// 	<NavigationMenu>
		// 		<NavigationMenuList>
		// 			<NavigationMenuItem>
		// 				<div>
		// 					<NavigationMenuLink className={navigationMenuTriggerStyle()}>Коллекция</NavigationMenuLink>
		// 				</div>
		// 			</NavigationMenuItem>
		// 			<NavigationMenuItem>
		// 				<div>
		// 					<NavigationMenuLink className={navigationMenuTriggerStyle()}>Избранное</NavigationMenuLink>
		// 				</div>
		// 			</NavigationMenuItem>
		// 			<NavigationMenuItem>
		// 				<div>
		// 					{/* <Button variant={'destructive'}>Выйти</Button> */}
		// 					<NavigationMenuLink className={navigationMenuTriggerStyle()}>Выйти</NavigationMenuLink>
		// 				</div>
		// 			</NavigationMenuItem>
		// 		</NavigationMenuList>
		// 	</NavigationMenu>
		// </div>
	)
}

export default MainPage
