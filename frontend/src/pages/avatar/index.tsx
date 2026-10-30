import { Box, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { CheckCircleRounded, EmojiEventsRounded, LockRounded } from '@mui/icons-material'
import felizGif from '@src/assets/images/avatar/feliz.gif'
import sadGif from '@src/assets/images/avatar/sad.gif'
import serioGif from '@src/assets/images/avatar/serio.gif'
import { PageHeader, PageMetaData, SectionLabel, StressBar } from '@src/components'
import { avatarGlowSx, avatarRingSx, progressBarSx, riseInSx } from '@src/theme/brand'
import { stressColor } from '@src/theme/status'
import { displayFont, monoFont } from '@src/theme/typography'
import { useAvatar } from './hooks/useAvatar'
import type { NivelClima } from './types'

const CLIMA_GIF = { sun: felizGif, cloud: serioGif, storm: sadGif }

type AvatarCirculoProps = { clima: NivelClima['id']; alt: string; size: number }

const AvatarCirculo = ({ clima, alt, size }: AvatarCirculoProps) => (
  <Box
    sx={{
      width: size,
      height: size,
      mx: 'auto',
      p: '3px',
      borderRadius: '50%',
      background: avatarRingSx(clima),
    }}
  >
    <Box
      component="img"
      src={CLIMA_GIF[clima]}
      alt={alt}
      sx={{
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
        background: alpha('#ffffff', 0.06),
      }}
    />
  </Box>
)

const AvatarPage = () => {
  const { clima, niveles, badges, actividad, xp, nivelXp, progresoNivel, ultimoEstres } = useAvatar()
  const nivelActual = niveles.find((n) => n.actual)?.label ?? ''

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Avatar" />

      <PageHeader title="Tu avatar" subtitle="Refleja tu estado según tus evaluaciones y registros." />

      {/* Avatar climático + XP */}
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, sm: 'auto' }} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 168,
                mx: 'auto',
                borderRadius: '50%',
                boxShadow: avatarGlowSx(clima),
                animation: 'floatAnim 5s ease-in-out infinite',
              }}
            >
              <AvatarCirculo clima={clima} alt={`Avatar en estado ${nivelActual}`} size={168} />
            </Box>
            <Typography sx={{ fontFamily: displayFont, mt: 2 }}>
              {nivelActual}
            </Typography>
          </Grid>
          <Grid size="grow">
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Nivel {nivelXp}
              </Typography>
              <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem', color: 'primary.main' }}>
                {xp} XP
              </Typography>
            </Stack>
            <LinearProgress variant="determinate" value={progresoNivel} sx={{ mt: 1, height: 6, ...progressBarSx }} />

            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', mt: 2.5 }}>
              <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Estrés actual
              </Typography>
              <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem', color: ultimoEstres == null ? 'text.secondary' : stressColor(ultimoEstres) }}>
                {ultimoEstres == null ? 'Sin registros' : `${ultimoEstres} / 100`}
              </Typography>
            </Stack>
            <Box sx={{ mt: 1 }}>
              <StressBar value={ultimoEstres ?? 0} showValue={false} height={6} />
            </Box>

            <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 1.5 }}>
              Ganas XP registrando episodios, completando pausas activas y asistiendo a tus citas.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Escala climática */}
      <Box>
        <SectionLabel>Escala de estados</SectionLabel>
        <Grid container spacing={2}>
          {niveles.map((n) => (
            <Grid key={n.id} size={{ xs: 4 }}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: 'center',
                  opacity: n.actual ? 1 : 0.55,
                  border: n.actual ? '1px solid rgba(226,184,74,0.4)' : undefined,
                }}
              >
                <AvatarCirculo clima={n.id} alt={`Avatar en estado ${n.label}`} size={64} />
                <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>{n.label}</Typography>
                <Typography sx={{ fontFamily: monoFont, fontSize: '0.6rem', color: 'text.secondary' }}>{n.rango}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Insignias */}
      <Box>
        <SectionLabel>Insignias</SectionLabel>
        <Grid container spacing={2}>
          {badges.map((b) => (
            <Grid key={b.id} size={{ xs: 6, sm: 4, md: 2 }}>
              <Paper sx={{ p: 1.75, textAlign: 'center', opacity: b.obtenido ? 1 : 0.5 }}>
                {b.obtenido
                  ? <EmojiEventsRounded sx={{ fontSize: 24, color: 'primary.main' }} />
                  : <LockRounded sx={{ fontSize: 24, color: 'text.disabled' }} />}
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem', mt: 0.5 }}>{b.nombre}</Typography>
                <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary' }}>{b.descripcion}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Actividad */}
      <Box>
        <SectionLabel>Actividad reciente</SectionLabel>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={1.5}>
            {actividad.map((a) => (
              <Stack key={a.id} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <CheckCircleRounded sx={{ fontSize: 16, color: '#4ade80' }} />
                <Typography variant="body2" sx={{ flex: 1 }}>{a.texto}</Typography>
                <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.disabled' }}>{a.fecha}</Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  )
}

export default AvatarPage
