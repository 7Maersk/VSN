import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@components/ThemeProvider.tsx'
import { Toaster } from '@/components/ui/toaster'
import App from './App.tsx'
import AlbumsPage from './pages/AlbumsPage.tsx'
import ArtistsPage from './pages/ArtistsPage.tsx'
import AlbumPage from './pages/AlbumPage.tsx'
import '../app/globals.css'

import global_en from './locales/en/translation.json'
import global_ru from './locales/ru/translation.json'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import ArtistPage from './pages/ArtistPage.tsx'
import AuthPage from './pages/AuthPage.tsx'

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'ru',
	resources: {
		en: {
			global: global_en,
		},
		ru: {
			global: global_ru,
		},
	},
})

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/artists',
		element: <ArtistsPage />,
	},
	{
		path: '/albums',
		element: <AlbumsPage />,
	},
	{
		path: '/album/:id',
		element: <AlbumPage />,
	},
	{
		path: '/artist/:id',
		element: <ArtistPage />,
	},
	{
		path: '/login',
		element: <AuthPage />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<I18nextProvider i18n={i18next}>
				<RouterProvider router={router} />
				<Toaster />
			</I18nextProvider>
		</ThemeProvider>
	</React.StrictMode>
)
