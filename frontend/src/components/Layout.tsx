import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components'

const Layout = () => {
	return (
		<div className="h-full grid grid-cols-[20rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-4 gap-2">
			<div className="col-span-1 row-span-4">
				<Sidebar />
			</div>
			<div className="col-span-8 row-span-4">
				<div className="h-full grid grid-cols-[repeat(8,_1fr)] grid-rows-12 gap-4">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Layout
