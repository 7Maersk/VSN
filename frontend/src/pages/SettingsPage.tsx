import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/api/api.config'
import { z } from 'zod'
import { User } from '@/types'
import { useEffect, useState } from 'react'
import useAuth from '@/store/auth.store'
import { useTranslation } from 'react-i18next'

const formSchema = z.object({
	nickname: z
		.string()
		.min(2, { message: 'Минимальная длина 2 символа' })
		.max(20, { message: 'Максимальная длина 20 символов' }),
	// password: z
	// 	.string()
	// 	.min(4, { message: 'Минимальная длина 6 символов' })
	// 	.max(16, { message: 'Максимальная длина 16 символов' }),
	picture: z.instanceof(FileList).optional(),
	bio: z.string().max(512, { message: 'Максимальная длина 512 символов' }),
})

const SettingsPage = () => {
	const auth = useAuth()
	const [user, setUser] = useState<User | null>(null)

	const [t] = useTranslation('global')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nickname: '',
			bio: '',
		},
		mode: 'onChange',
	})

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const userData = await api.getUserInfo(`${auth.user?.id}`)
				setUser(userData)
				form.reset({
					nickname: userData?.nickname || '',
					bio: userData?.bio || '',
				})
			} catch (error) {
				console.error('Ошибка поиска пользователя', error)
			}
		}

		fetchUserInfo()
	}, [auth.user?.id, form])

	if (!user) {
		return <div>Авторизуйтесь для редактирования профиля</div>
	}

	const fileRef = form.register('picture')

	async function onSubmit({ nickname, bio, picture }: z.infer<typeof formSchema>) {
		await api.updateUserInfo({
			//@ts-ignore
			user_id: auth.user?.id,
			bio,
			nickname,
			//@ts-ignore
			picture: picture[0],
		})
	}

	return (
		<div className="flex flex-col justify-center items-center w-full h-full col-span-8 row-span-12 px-4 py-2">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-1/2 items-center justify-center flex flex-col"
				>
					<FormField
						control={form.control}
						name="nickname"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>{t('translation.nickname')}</FormLabel>
								<FormControl>
									<Input placeholder={t('translation.nickname')} type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="picture"
						render={() => (
							<FormItem className="w-full">
								<FormLabel>{t('translation.avatar')}</FormLabel>
								<FormControl>
									<Input placeholder={t('translation.avatar')} type="file" {...fileRef} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>{t('translation.bio')}</FormLabel>
								<FormControl>
									<Textarea placeholder={t('translation.bio')} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* <FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input placeholder="Пароль" type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<Button
						type="submit"
						className="w-full"
						// disabled={!form.formState.isDirty || !form.formState.isValid}
					>
						{t('translation.save')}
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default SettingsPage
