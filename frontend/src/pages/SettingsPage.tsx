import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			login: '',
			password: '',
		},
		mode: 'onChange',
	})

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
								<FormLabel>Логин</FormLabel>
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
					<FormField
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
					/>
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
