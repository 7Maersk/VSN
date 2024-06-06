import React from 'react'
import ReactDOM from 'react-dom/client'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { ThemeProvider, Layout } from '@/components'
import { PrivateRoute } from './hoc'
import { Toaster } from '@/components/ui/toaster'
import '../app/globals.css'

import translation from './locales/translation.json'

import {
	ArtistPage,
	AlbumPage,
	ArtistsPage,
	AlbumsPage,
	AuthPage,
	MainPage,
	ProfilePage,
	CollectionPage,
	BlogPage,
	SettingsPage,
	RecommendationsPage,
	FavoritesPage,
	ThreadPage,
	ThreadsPage
} from './pages'

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'ru',
	resources: {
		en: {
			global: translation.en,
		},
		ru: {
			global: translation.ru,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				<I18nextProvider i18n={i18next}>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index path="/" element={<MainPage />} />
							<Route path="login" element={<AuthPage />} />
							<Route path="albums" element={<AlbumsPage />} />
							<Route path="album/:id" element={<AlbumPage />} />
							<Route path="artist/:id" element={<ArtistPage />} />
							<Route path="artists" element={<ArtistsPage />} />
							<Route path="blog" element={<BlogPage />} />
							<Route path="threads" element={<ThreadsPage />} />
							<Route
								path="profile"
								element={
									<PrivateRoute>
										<ProfilePage />
									</PrivateRoute>
								}
							/>
							<Route
								path="collection"
								element={
									<PrivateRoute>
										<CollectionPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="settings"
								element={
									<PrivateRoute>
										<SettingsPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="recommendations"
								element={
									<PrivateRoute>
										<RecommendationsPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="favorites"
								element={
									<PrivateRoute>
										<FavoritesPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="thread/:room"
								element={
									<PrivateRoute>
										<ThreadPage />
									</PrivateRoute>
								}
							/>
							<Route path="*" element={<div>404</div>} />
						</Route>
					</Routes>
					<Toaster />
				</I18nextProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
