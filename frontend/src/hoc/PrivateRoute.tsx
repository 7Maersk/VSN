import useAuth from '@/store/auth.store'
import { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
	const location = useLocation()
	const { user } = useAuth()
	if (!user) return <Navigate to="/login" state={{ from: location }} />

	return children
}

export default PrivateRoute
