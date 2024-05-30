import { AuthService } from '@/api/api.config'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type AuthState = {
	user: {
		id: number | undefined
		login: string | undefined
	}
	isAuth: boolean
	accessToken: string | undefined
	refreshToken: string | undefined
}

type AuthAction = {
	login: () => void
	logout: () => void
}

const useAuthStore = {} 
// create<AuthState & AuthAction>()(
	// devtools((set) => ({}))
// )

export default useAuthStore
