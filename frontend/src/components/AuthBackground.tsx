import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { bgAnimatedSx, orbSx } from '@src/theme/brand'

// Fondo de pantallas públicas: navy animado + orbs ambientales.
const AuthBackground = ({ children }: { children: ReactNode }) => (
  <Box
    className="scroll-area"
    sx={[
      bgAnimatedSx,
      {
        height: '100svh',
        position: 'relative',
        overflowY: 'auto',
        display: 'flex',
      },
    ]}
  >
    <Box sx={[orbSx, { width: 460, height: 460, top: -140, right: -120, background: 'rgba(226,184,74,0.12)', animation: 'floatAnim 13s ease-in-out infinite' }]} />
    <Box sx={[orbSx, { width: 380, height: 380, bottom: -140, left: -100, background: 'rgba(96,165,250,0.1)', animation: 'floatAnim 17s ease-in-out infinite reverse' }]} />
    <Box sx={{ m: 'auto', display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
      {children}
    </Box>
  </Box>
)

export default AuthBackground
