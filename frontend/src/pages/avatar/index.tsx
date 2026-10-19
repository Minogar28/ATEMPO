import { Box, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { CheckCircleRounded, EmojiEventsRounded, LockRounded, WbSunnyRounded, CloudRounded, ThunderstormRounded } from '@mui/icons-material'
import { PageHeader, PageMetaData, SectionLabel } from '@src/components'
import { avatarGlowSx, progressBarSx, riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { useAvatar } from './hooks/useAvatar'

const CLIMA_ICON = { sun: WbSunnyRounded, cloud: CloudRounded, storm: ThunderstormRounded }

const AvatarPage = () => {
  const { clima, niveles, badges, actividad, xp, nivelXp, progresoNivel } = useAvatar()
  const ClimaIcon = CLIMA_ICON[clima]

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
                width: 130,
                height: 130,
                mx: 'auto',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: alpha('#ffffff', 0.06),
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: avatarGlowSx(clima),
                animation: 'floatAnim 5s ease-in-out infinite',
              }}
            >
              <ClimaIcon sx={{ fontSize: 56, color: 'primary.main' }} />
            </Box>
            <Typography sx={{ fontFamily: displayFont, mt: 1.5 }}>
              {niveles.find((n) => n.actual)?.label}
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
          {niveles.map((n) => {
            const Icon = CLIMA_ICON[n.id]
            return (
              <Grid key={n.id} size={{ xs: 4 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    opacity: n.actual ? 1 : 0.55,
                    border: n.actual ? '1px solid rgba(226,184,74,0.4)' : undefined,
                  }}
                >
                  <Icon sx={{ fontSize: 26, color: n.actual ? 'primary.main' : 'text.disabled' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>{n.label}</Typography>
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.6rem', color: 'text.secondary' }}>{n.rango}</Typography>
                </Paper>
              </Grid>
            )
          })}
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
