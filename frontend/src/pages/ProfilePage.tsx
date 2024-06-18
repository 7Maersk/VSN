import { AuthService, api } from '@/api/api.config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import useAuth from '@/store/auth.store'
import { Albums, Artist } from '@/types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
	const { user, logOut } = useAuth()
	const [userInfo, setUserInfo] = useState<{
		avatar: string
		bio: string
		id: number
		nickname: string
	} | null>(null)

	const [t] = useTranslation('global')

	const [userCollection, setUserCollection] = useState([])

	const logouthandler = () => {
		logOut()
	}

	useEffect(() => {
		//@ts-ignore
		api.getUserInfo(user?.id)
			.then((info) => {
				setUserInfo(info)
			})
			//@ts-ignore
			.then(() => api.getUserCollection(user?.id).then((collection) => setUserCollection(collection)))
	}, [])
	return (
		<div className="col-span-8 row-span-12 px-4 py-4">
			{userInfo && (
				<>
					<div className="flex gap-4 w-full">
						<img
							className="aspect-square object-cover object-center rounded-md max-w-xs"
							src={`${api.staticURL}/avatars/${userInfo.avatar}`}
							alt={`Album ${userInfo.nickname}`}
						/>
						<div className="border rounded-md p-4 w-full">
							<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
								{userInfo.nickname}
							</h2>
							<p className="leading-7 [&:not(:first-child)]:mt-6">
								<span className="text-lg font-semibold mr-2">{t('translation.bio')}</span>
								{userInfo.bio}
							</p>
							<Button onClick={logouthandler}>Выйти</Button>
						</div>
					</div>
					<div className="flex flex-col gap-4 mt-4">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
							{t('translation.yourcollection')}
						</h3>

						<div className="grid grid-cols-5 auto-rows-min gap-6 py-4 pt-0">
							{userCollection.map((album: Albums) => (
								<Card
									key={album.id + Date.now()}
									className="rounded-md border-none shadow-sm flex flex-col"
								>
									<CardContent className="flex aspect-square items-end justify-start p-6 relative">
										<Link to={`/album/${album.id}`} className="contents">
											<img
												src={`${api.staticURL}/albums/${album.cover}`}
												alt={`Album ${album.name}`}
												className="absolute w-full h-full object-cover object-center top-0 left-0 rounded-t-md"
											/>
										</Link>
									</CardContent>
									<CardFooter className="border border-t-0 rounded-bl-md rounded-br-md p-0 min-h-32">
										<Link
											to={`/album/${album.id}`}
											className="flex w-full h-full flex-col items-start px-4 py-2"
										>
											<span className="text-base font-semibold">{album.name}</span>
											<span className="text-sm font-semibold">
												{album.artists.map((artist: Artist) => artist.nickname).join(', ')}
											</span>
										</Link>
									</CardFooter>
								</Card>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default ProfilePage
