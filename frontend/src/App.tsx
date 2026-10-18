import { useMemo } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Router from '@src/routes/Router'
import { useLayout } from '@src/states/LayoutContext'
import { createAppTheme } from '@src/theme'
import './App.css'

const App = () => {
  const { settings } = useLayout()
  const theme = useMemo(
    () => createAppTheme(settings.themeMode),
    [settings.themeMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App
