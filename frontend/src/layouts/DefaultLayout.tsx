import Box from '@mui/material/Box'
import { Outlet } from 'react-router'

// Layout mínimo para rutas públicas y de error.
const DefaultLayout = () => (
  <Box sx={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
    <Outlet />
  </Box>
)

export default DefaultLayout
