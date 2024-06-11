import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { api } from '@/api/api.config'
import useAuth from '@/store/auth.store'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const socket = io('http://localhost:3001', {
	withCredentials: true,
	extraHeaders: {
		'my-custom-header': 'abcd',
	},
})

interface Message {
	id: number
	text: string
	img: string
	room_id: number
	user_id: number
	nickname: string
	datetime: string
}

const ThreadPage = () => {
	const auth = useAuth()
	const { room } = useParams<{ room: string }>()
	const [messages, setMessages] = useState<Message[]>([])
	const [message, setMessage] = useState<string>('')
	const [image, setImage] = useState<File | null>(null)
	const user_id = auth.user?.id

	const [t] = useTranslation('global')

	useEffect(() => {
		if (room) {
			socket.emit('joinRoom', room)

			socket.on('initialMessages', (messages: Message[]) => {
				setMessages(messages)
			})

			socket.on('receiveMessage', (newMessage: Message) => {
				setMessages((prevMessages) => [...prevMessages, newMessage])
			})
		}

		return () => {
			socket.off('initialMessages')
			socket.off('receiveMessage')
		}
	}, [room])

	const sendMessage = async () => {
		if (message.trim() && room) {
			let imageUrl = null

			if (image) {
				const formData = new FormData()
				formData.append('image', image)

				try {
					const response = await axios.post('http://localhost:3001/upload', formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					imageUrl = response.data.filename
				} catch (error) {
					console.error('Ошибка загрузки изображения:', error)
				}
			}

			socket.emit('sendMessage', { room, message, user_id, image: imageUrl })
			setMessage('')
			setImage(null)
		}
	}

	return (
		<div className="col-span-8 row-span-12 px-4 py-4 flex flex-col gap-8 overflow-auto">
			<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
				{t('translation.theme')}: {room}
			</h4>

			<div className="flex flex-col w-full items-start gap-4">
				{messages.map((msg) => (
					<div key={msg.id} className="flex w-full items-start gap-2.5">
						<img
							className="w-8 h-8 rounded-full"
							src={`${api.staticURL}/avatars/${auth.user?.avatar}`}
							alt="nickname"
						/>
						<div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
							<div className="flex items-center space-x-2 rtl:space-x-reverse">
								<span className="text-sm font-semibold text-gray-900 dark:text-white">
									{msg.nickname}
								</span>
								<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
									{new Date(msg.datetime).toLocaleString()}
								</span>
							</div>
							<p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg.text}</p>
							{msg.img && <img src={`${api.staticURL}/images/${msg.img}`} alt="attached" />}
						</div>
					</div>
				))}
			</div>
			<div className='flex gap-4'>
				<Input
					type="text"
					value={message}
					placeholder={t('translation.write')}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Input
					type="file"
					accept="image/*"
					onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
				/>
				<Button onClick={sendMessage}>{t('translation.send')}</Button>
			</div>
		</div>
	)
}

export default ThreadPage
