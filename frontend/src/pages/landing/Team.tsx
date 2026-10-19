import { Avatar, Box, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { displayFont, monoFont } from '@src/theme/typography'
import { ContainerBox, SectionTitle } from './components'

// Estudiantes del Programa de Psicología — Tecnológico de Comfenalco,
// autores de la idea original del aplicativo.
const ESTUDIANTES = [
  'Keilin Sofia Galindo Velasco',
  'Kevin Santiago Hoyos Hernández',
  'Orlando Miguel Nisperuza Polo',
  'Angie Paola Ramos Gordon',
  'Sharith Rivera Pérez',
  'Luis Mario Suarez Noriega',
]

const iniciales = (nombre: string) => {
  const partes = nombre.split(' ')
  return `${partes[0][0]}${partes[2]?.[0] ?? partes[1][0]}`.toUpperCase()
}

const Team = () => (
  <ContainerBox sx={{ py: { xs: 6, md: 9 } }}>
    <span id="equipo" style={{ scrollMarginTop: '5rem' }} />
    <SectionTitle
      name="El equipo"
      title="Las mentes detrás de ATEMPO"
      description="Estudiantes del Programa de Psicología — Facultad de Ciencias Sociales y Humanas, Tecnológico de Comfenalco — que tuvieron la idea de este aplicativo."
    />

    {/* Tira horizontal de tarjetas con scroll-snap */}
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        pb: 1.5,
        scrollSnapType: 'x mandatory',
        '&::-webkit-scrollbar': { height: 6 },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: alpha('#E2B84A', 0.25),
          borderRadius: 3,
        },
        '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
      }}
    >
      {ESTUDIANTES.map((nombre, i) => (
        <Box
          key={nombre}
          sx={(theme) => ({
            flex: '0 0 auto',
            width: { xs: 220, sm: 240 },
            p: 3,
            borderRadius: 3,
            scrollSnapAlign: 'start',
            textAlign: 'center',
            bgcolor: alpha(theme.palette.background.paper, 0.55),
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(18px) saturate(150%)',
            transition: 'transform 0.25s, border-color 0.25s',
            '&:hover': { transform: 'translateY(-4px)', borderColor: 'rgba(226,184,74,0.35)' },
          })}
        >
          <Avatar
            sx={{
              width: 52,
              height: 52,
              mx: 'auto',
              mb: 1.5,
              fontFamily: displayFont,
              fontSize: '1.05rem',
              bgcolor: alpha('#E2B84A', 0.14),
              color: 'primary.main',
              border: '1px solid rgba(226,184,74,0.3)',
            }}
          >
            {iniciales(nombre)}
          </Avatar>
          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.45 }}>
            {nombre}
          </Typography>
          <Typography
            sx={{
              mt: 1,
              fontFamily: monoFont,
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          >
            Estudiante de Psicología
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              fontFamily: monoFont,
              fontSize: '0.56rem',
              color: alpha('#FAF6ED', 0.35),
            }}
          >
            {String(i + 1).padStart(2, '0')} / {String(ESTUDIANTES.length).padStart(2, '0')}
          </Typography>
        </Box>
      ))}
    </Box>

    <Stack sx={{ alignItems: 'center', mt: 2.5 }}>
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: '0.62rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          textAlign: 'center',
        }}
      >
        Facultad de Ciencias Sociales y Humanas · Tecnológico de Comfenalco
      </Typography>
    </Stack>
  </ContainerBox>
)

export default Team
