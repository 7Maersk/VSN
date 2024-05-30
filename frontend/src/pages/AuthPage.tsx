import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import useAuth from '@/store/auth.store'

const formSchema = z.object({
	login: z
		.string()
		.min(2, { message: 'Минимальная длина 2 символа' })
		.max(50, { message: 'Максимальная длина 50 символов' }),
	password: z
		.string()
		.min(4, { message: 'Минимальная длина 6 символов' })
		.max(16, { message: 'Максимальная длина 16 символов' }),
})

const AuthPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { logIn, user } = useAuth()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			login: '',
			password: '',
		},
		mode: 'onChange',
	})

	function onSubmit({ login, password }: z.infer<typeof formSchema>) {
		logIn(login, password)
	}

	if (user) {
		const fromPage = location.state?.from?.pathname || '/'
		return <Navigate to={fromPage}/>
	}

	return (
		<div className="flex justify-center w-full h-full col-span-8 row-span-12">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-60 items-center justify-center flex flex-col"
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
						Войти
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default AuthPage
