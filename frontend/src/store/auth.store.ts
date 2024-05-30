import { AuthService } from '@/api/api.config'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type AuthState = {
	user: {
		id: number | undefined
		login: string | undefined
	} | null
	accessToken: string | undefined
	refreshToken: string | undefined
}

type AuthAction = {
	logIn: (login: string, password: string) => void
	logOut: () => void
}

const useAuth = create<AuthState & AuthAction>()(
	devtools(
		persist(
			(set) => ({
				user: null, // <-- initially "unknown"

				accessToken: undefined,
				refreshToken: undefined,

				logIn: async (login: string, password: string) => {
					AuthService.login(login, password)
						.then(({ data }) => {
							const { user, accessToken, refreshToken } = data
							set({
								user,
								accessToken,
								refreshToken,
							})
						})
						.catch(() => {
							set({ user: null, accessToken: undefined, refreshToken: undefined })
						})
				},

				logOut: async () => {},
			}),
			{
				name: 'auth',
			}
		)
	)
)

export default useAuth
