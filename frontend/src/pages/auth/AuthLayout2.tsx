import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FaceRetouchingNaturalRounded, MonitorHeartRounded, SelfImprovementRounded } from '@mui/icons-material'
import { AuthBackground } from '@src/components'
import { APP_NAME } from '@src/config/api'
import { glassMustardSx, glassSx, riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import type { ReactNode } from 'react'

const FEATURES = [
  { icon: MonitorHeartRounded, label: 'CAREband' },
  { icon: SelfImprovementRounded, label: 'Pausa' },
  { icon: FaceRetouchingNaturalRounded, label: 'Avatar' },
]

// Layout público del prototipo: marca + formulario + tarjeta de features,
// sobre el fondo navy con orbs (AuthBackground).
const AuthLayout2 = ({ children }: { children: ReactNode }) => (
  <AuthBackground>
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 420, px: 2, py: 4, position: 'relative', zIndex: 1 }}>
      <Box sx={[glassSx, riseInSx, { borderRadius: 3, p: 3, textAlign: 'center' }]}>
        <Box
          sx={{
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 1.5,
            borderRadius: '18px',
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(135deg, #E2B84A, #c9a035)',
            boxShadow: '0 0 32px rgba(226,184,74,0.4)',
            animation: 'floatAnim 5s ease-in-out infinite',
          }}
        >
          <Typography sx={{ fontFamily: displayFont, fontSize: '1.7rem', color: '#0C1F3C', lineHeight: 1 }}>
            A
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: displayFont, fontSize: '1.9rem', lineHeight: 1.15 }}>
          {APP_NAME}
        </Typography>
        <Typography
          sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.secondary', letterSpacing: '0.08em', mt: 0.5 }}
        >
          bienestar psicofisiológico
        </Typography>
      </Box>

      {children}

      <Stack direction="row" spacing={1.5}>
        {FEATURES.map(({ icon: Icon, label }) => (
          <Box
            key={label}
            sx={[glassMustardSx, { flex: 1, borderRadius: 2, py: 1.5, textAlign: 'center' }]}
          >
            <Icon sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', mt: 0.5 }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* Pie del acceso */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontFamily: monoFont, fontSize: '0.6rem', color: 'rgba(250,246,237,0.35)', letterSpacing: '0.08em' }}>
          Datos de salud protegidos · Ley 1581 de 2012 · {APP_NAME} v0.1
        </Typography>
      </Box>
    </Stack>
  </AuthBackground>
)

export default AuthLayout2
