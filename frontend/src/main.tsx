import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@components/ThemeProvider.tsx'
import App from './App.tsx'
import AlbumsPage from './pages/AlbumsPage.tsx'
import '../app/globals.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/artists',
		element: <div>This is artists page</div>,
	},
	{
		path: '/albums',
		element: <AlbumsPage />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
)
