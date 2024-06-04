import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/api/api.config'
import { z } from 'zod'
import { Albums, User } from '@/types'
import { useEffect, useState } from 'react'

const formSchema = z.object({
	login: z
		.string()
		.min(2, { message: 'Минимальная длина 2 символа' })
		.max(50, { message: 'Максимальная длина 50 символов' }),
	password: z
		.string()
		.min(4, { message: 'Минимальная длина 6 символов' })
		.max(16, { message: 'Максимальная длина 16 символов' }),
	picture: z.instanceof(FileList).optional(),
	bio: z.string().max(512, { message: 'Максимальная длина 512 символов' }),
})

const SettingsPage = () => {

	const id = JSON.parse(localStorage.getItem('auth') || '{}')?.state?.user?.id ?? 'ID не найден';
	const [user, setUser] = useState<User | null>(null)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			login: '',
			password: '',
		},
		mode: 'onChange',
	})

	useEffect(() => {
		api.getUserInfo(id || 1).then((user) => setUser(user))
	}, [id])

	console.log(api.getUserInfo(id || 1))

	/* не понимаю почему возвращается пустой промис, причем в нетворк респонс с сервера приходит
	мое видение страницы настроек - это когда ты на нее заходишь у тебя уже заполнены поля ник био аватар из базы данных, 
	ты можешь стереть или дополнить что то, после этого данные обновляются в бдшке
	пароль меняется отдельной ссылкой на смену пароля(контроллер написал) */

	// if (!user) {
	// 	return <div>Авторизуйтесь для редактирования профиля</div>
	// }

	const fileRef = form.register('picture')

	function onSubmit({ login, password, bio, picture }: z.infer<typeof formSchema>) {
		console.log(login, password, bio, picture)
		//TODO: Отправка на сервер
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
						name="login"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Никнейм</FormLabel>
								<FormControl>
									<Input placeholder="Логин" type="text" {...field} />
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
								<FormLabel>Аватар</FormLabel>
								<FormControl>
									<Input placeholder="Аватар" type="file" {...fileRef} />
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
								<FormLabel>Био</FormLabel>
								<FormControl>
									<Textarea placeholder="Био" {...field} />
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
						disabled={!form.formState.isDirty || !form.formState.isValid}
					>
						Сохранить
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default SettingsPage
