import { ThemeProvider } from '@components/ThemeProvider.tsx'
import { MainPage } from './pages'

function App() {
	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<MainPage />
		</ThemeProvider>
	)
}

export default App
