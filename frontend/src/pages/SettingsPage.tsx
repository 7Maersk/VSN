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

	const id = (JSON.parse(localStorage.getItem('auth') || '{}')?.state?.user?.id).toString();
	const [user, setUser] = useState<User | null>(null)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nickname: '',
			bio: '',
		},
		mode: 'onChange',
	});

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const userData = await api.getUserInfo(id);
				setUser(userData);
				form.reset({
					nickname: userData?.nickname || '',
					bio: userData?.bio || '',
				});
			} catch (error) {
				console.error('Ошибка поиска пользователя', error);
			}
		};

		fetchUserInfo();
	}, [id, form]);

	if (!user) {
		return <div>Авторизуйтесь для редактирования профиля</div>
	}

	const fileRef = form.register('picture')

	async function onSubmit({ nickname, bio, picture }: z.infer<typeof formSchema>) {
		try {
			const formData = new FormData();
			formData.append('user_id', id);
			formData.append('nickname', nickname);
			formData.append('bio', bio);
			if (picture && picture.length > 0) { //в случае если файл аватара не добавлен, добавляется изначальное название, он если он добавлен,
				//нужно отправить его на сервер и сохранить там в папку public/avatars
				formData.append('avatar', picture[0]);
			} else {
				formData.append('avatar', user?.avatar || '');
			}
			await api.updateUserInfo(formData);
		} catch (error) {
			console.error('Ошибка при отправке данных на сервер', error);
		}
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
								<FormLabel>Никнейм</FormLabel>
								<FormControl>
									<Input placeholder="Никнейм" type="text" {...field} />
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
					// disabled={!form.formState.isDirty || !form.formState.isValid}
					>
						Сохранить
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default SettingsPage
