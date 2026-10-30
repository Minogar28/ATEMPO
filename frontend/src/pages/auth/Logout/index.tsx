import { useEffect, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import miniFeliz from '@src/assets/images/avatar/mini-feliz.png'
import felizVideo from '@src/assets/images/avatar/feliz.mp4'
import { AppLogo, AuthBackground, PageMetaData } from '@src/components'
import { APP_NAME } from '@src/config/api'
import { useAuth } from '@src/states/AuthContext'
import { avatarGlowSx, avatarRingSx, glassSx, riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'

// Omite títulos como "Dra." para despedir por el nombre.
const primerNombre = (nombre?: string) => nombre?.split(' ').find((parte) => !parte.endsWith('.'))

// Despedida al cerrar sesión. La sesión se cierra al montar, por eso el nombre
// se conserva antes. Usa el mp4 del avatar: pesa 2 MB frente a los 21 MB del GIF
// y aquí tiene que verse de inmediato.
const Logout = () => {
  const { user, logout } = useAuth()
  const [nombre] = useState(() => primerNombre(user?.name))

  useEffect(() => {
    logout()
  }, [logout])

  return (
    <AuthBackground>
      <PageMetaData title="Hasta pronto" />

      <Stack spacing={3} sx={{ width: '100%', maxWidth: 420, px: 2, py: 4 }}>
        <Box sx={[glassSx, riseInSx, { borderRadius: 3, p: { xs: 3, sm: 4 }, textAlign: 'center' }]}>
          <Box
            sx={{
              width: 184,
              height: 184,
              mx: 'auto',
              p: '4px',
              borderRadius: '50%',
              background: avatarRingSx('sun'),
              boxShadow: avatarGlowSx('sun'),
              animation: 'floatAnim 5s ease-in-out infinite',
            }}
          >
            <Box
              component="video"
              src={felizVideo}
              poster={miniFeliz}
              autoPlay
              loop
              muted
              playsInline
              aria-label="Tu avatar feliz se despide"
              sx={{ display: 'block', width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </Box>

          <Typography component="h1" sx={{ fontFamily: displayFont, fontSize: '2rem', lineHeight: 1.15, mt: 3 }}>
            ¡Hasta pronto{nombre ? `, ${nombre}` : ''}!
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mt: 1 }}>
            Gracias por darte este momento. Tu avatar te espera cuando quieras volver.
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'primary.main', mt: 2 }}>
            Respira hondo y sigue a tu ritmo.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
            <Button component={RouterLink} to="/auth/login" replace variant="contained" fullWidth>
              Volver a entrar
            </Button>
            <Button component={RouterLink} to="/landing" replace variant="outlined" fullWidth>
              Ir a la página principal
            </Button>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <AppLogo size={24} />
          <Typography sx={{ fontFamily: monoFont, fontSize: '0.6rem', color: 'rgba(250,246,237,0.35)', letterSpacing: '0.08em' }}>
            {APP_NAME} - {new Date().getFullYear()}
          </Typography>
        </Stack>
      </Stack>
    </AuthBackground>
  )
}

export default Logout
