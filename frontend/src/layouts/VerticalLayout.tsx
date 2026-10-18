import Box from '@mui/material/Box'
import { Outlet } from 'react-router'
import { useViewPort } from '@src/hooks/useViewPort'
import { bgAnimatedSx, orbSx } from '@src/theme/brand'
import Chat from '@src/components/Chat'
import LeftSideBar from './LeftSideBar'
import MobileNav from './MobileNav'

// App shell del prototipo: viewport bloqueado, sidebar flotante y contenido
// con scroll interno sobre fondo navy animado con orbs ambientales.
const VerticalLayout = () => {
  const { isMobile } = useViewPort()

  return (
    <Box sx={[bgAnimatedSx, { display: 'flex', height: '100svh', position: 'relative', overflow: 'hidden' }]}>
      <Box sx={[orbSx, { width: 480, height: 480, top: -160, left: -120, background: '#1F3A5F', opacity: 0.5 }]} />
      <Box sx={[orbSx, { width: 288, height: 288, bottom: -80, right: 240, background: '#E2B84A', opacity: 0.07 }]} />
      <Box sx={[orbSx, { width: 224, height: 224, top: '45%', right: -60, background: '#111827', opacity: 0.7 }]} />

      {!isMobile && <LeftSideBar />}

      <Box
        component="main"
        className="scroll-area"
        sx={{
          flex: 1,
          minWidth: 0,
          position: 'relative',
          zIndex: 1,
          px: { xs: 1.5, md: 3 },
          pt: { xs: 2, md: 3 },
          pb: { xs: 12, md: 3 },
        }}
      >
        <Box sx={{ maxWidth: 896, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>

      {isMobile && <MobileNav />}
      <Chat />
    </Box>
  )
}

export default VerticalLayout
