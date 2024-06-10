import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // Импорт Link из react-router-dom
import { api } from '@/api/api.config'
import { useTranslation } from 'react-i18next'
import { Room } from '@/types'

const RoomListPage = () => {
	const [rooms, setRooms] = useState<Room[]>([])
	const [t] = useTranslation('global')

	useEffect(() => {
		api.getRooms().then((rooms: Room[]) => setRooms(rooms))
	}, [])

	return (
		<div className="col-span-8 row-span-12 px-4 py-4">
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				{t('translation.threads')}
			</h2>
			<ul className="mt-4 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
				{rooms.map((room) => (
					<li className="py-3 sm:py-4" key={room.name}>
						<Link to={`/thread/${room.name}`}>
							<div className="flex items-center space-x-4 rtl:space-x-reverse">
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
										{room.name}
									</p>
								</div>
								<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									{room.messages_count}
								</div>
							</div>
						</Link>
						{/* {room.name}</Link> */}
					</li>
				))}
			</ul>
		</div>
	)
}

export default RoomListPage
