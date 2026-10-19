import { Avatar, Box, Chip, Grid, Paper, Stack, Typography } from '@mui/material'
import {
  AssessmentRounded,
  BusinessRounded,
  CalendarMonthRounded,
  DashboardRounded,
  GroupsRounded,
  MonitorHeartRounded,
  PersonRounded,
  SelfImprovementRounded,
  SettingsRounded,
  TimelineRounded,
  VideocamRounded,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router'
import { alpha } from '@mui/material/styles'
import type { SvgIconComponent } from '@mui/icons-material'
import { EmptyState, PageMetaData, SectionLabel, StatCard, StressBar, StressRing } from '@src/components'
import { fechaRelativa } from '@src/helpers/dates'
import { glassMustardSx, riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { stressColor } from '@src/theme/status'
import { useHome } from './hooks/useHome'
import { CHECKIN_MOODS } from './hooks/useHome'

const ACTION_ICONS: Record<string, SvgIconComponent> = {
  monitor: MonitorHeartRounded,
  timeline: TimelineRounded,
  breath: SelfImprovementRounded,
  calendar: CalendarMonthRounded,
  panel: DashboardRounded,
  report: AssessmentRounded,
  video: VideocamRounded,
  person: PersonRounded,
  settings: SettingsRounded,
  business: BusinessRounded,
  users: GroupsRounded,
}

const ESTADO_COLOR: Record<string, string> = {
  confirmada: '#4ade80',
  pendiente: '#E2B84A',
  completada: '#60a5fa',
  cancelada: '#7a8494',
}

const HomePage = () => {
  const { greeting, esPaciente, stressLevel, stats, quickActions, episodes, citas, tip, checkIn, checkInHoy, statTooltip } = useHome()

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Inicio" />

      <Box>
        <Typography sx={{ fontFamily: displayFont, fontSize: '1.9rem' }}>{greeting}</Typography>
        <Typography variant="body2" color="text.secondary">
          {esPaciente ? 'Así va tu bienestar hoy.' : 'Así va la operación hoy.'}
        </Typography>
      </Box>

      {/* Tarjeta principal: anillo de estrés (paciente) o stats de operación */}
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ alignItems: 'center' }}>
          {esPaciente && (
            <Grid size={{ xs: 12, sm: 'auto' }}>
              <StressRing level={stressLevel} size={150} />
            </Grid>
          )}
          <Grid size="grow">
            <Grid container spacing={2}>
              {stats.map((stat) => (
                <Grid key={stat.id} size={{ xs: 6, sm: 3 }}>
                  <StatCard value={stat.value} label={stat.label} hint={stat.hint} tooltip={statTooltip(stat.id)} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Check-in de 1 toque (paciente) */}
      {esPaciente && (
        <Paper sx={{ px: 2.5, py: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {checkInHoy ? `Check-in de hoy: ${checkInHoy.mood}` : '¿Cómo vas hoy?'}
              </Typography>
              <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>
                {checkInHoy ? `Registrado ${fechaRelativa(checkInHoy.ts)} — puedes actualizarlo.` : 'Un toque registra tu estado y alimenta tu semáforo.'}
              </Typography>
            </Box>
            <Stack direction="row" sx={{ gap: 0.75, flexWrap: 'wrap' }}>
              {CHECKIN_MOODS.map((m) => {
                const activo = checkInHoy?.mood === m.mood
                return (
                  <Chip
                    key={m.mood}
                    label={m.mood}
                    size="small"
                    onClick={() => checkIn(m.mood, m.level)}
                    sx={{
                      bgcolor: activo ? alpha(stressColor(m.level), 0.18) : alpha('#ffffff', 0.05),
                      border: `1px solid ${alpha(activo ? stressColor(m.level) : '#ffffff', activo ? 0.45 : 0.1)}`,
                      color: activo ? stressColor(m.level) : 'text.secondary',
                    }}
                  />
                )
              })}
            </Stack>
          </Stack>
        </Paper>
      )}

      {/* Acciones rápidas (solo lo que el rol puede abrir) */}
      <Box>
        <SectionLabel>Acciones rápidas</SectionLabel>
        <Grid container spacing={2}>
          {quickActions.map((action) => {
            const Icon = ACTION_ICONS[action.icon]
            return (
              <Grid key={action.label} size={{ xs: 6, md: 3 }}>
                <Paper
                  component={RouterLink}
                  to={action.path}
                  sx={{
                    display: 'block',
                    p: 2,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s, border-color 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', borderColor: 'rgba(226,184,74,0.3)' },
                  }}
                >
                  {Icon && <Icon sx={{ fontSize: 20, color: 'primary.main', mb: 1 }} />}
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{action.label}</Typography>
                  <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>
                    {action.description}
                  </Typography>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Box>

      {/* Paciente: episodios recientes */}
      {esPaciente && (
        <Box>
          <SectionLabel>Episodios recientes</SectionLabel>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              {episodes.map((ep) => (
                <Stack key={ep.id} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: stressColor(ep.level),
                      boxShadow: `0 0 8px ${stressColor(ep.level)}`,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{ep.mood}</Typography>
                      <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }} noWrap>
                        {ep.trigger}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled' }}>{ep.date}</Typography>
                  </Box>
                  <Box sx={{ width: 90 }}>
                    <StressBar value={ep.level} showValue={false} height={4} />
                  </Box>
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem', color: stressColor(ep.level), width: 24, textAlign: 'right' }}>
                    {ep.level}
                  </Typography>
                </Stack>
              ))}
              {episodes.length === 0 && (
                <EmptyState
                  icon={TimelineRounded}
                  title="Sin registros todavía"
                  description="Tu historial de episodios aparecerá aquí."
                  actionLabel="Registrar episodio"
                  actionTo="/monitoreo"
                />
              )}
            </Stack>
          </Paper>
        </Box>
      )}

      {/* Profesional/admin: agenda de citas */}
      {!esPaciente && (
        <Box>
          <SectionLabel>Agenda de citas</SectionLabel>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              {citas.map((c) => (
                <Stack key={c.id} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Avatar sx={{ width: 32, height: 32, borderRadius: 2, fontSize: '0.72rem' }}>
                    {c.psicologo.slice(4, 5)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>{c.psicologo}</Typography>
                    <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.disabled' }}>
                      {c.fecha} · {c.hora} · {c.modalidad}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={c.estado}
                    sx={{
                      height: 20,
                      fontSize: '0.62rem',
                      bgcolor: alpha(ESTADO_COLOR[c.estado] ?? '#7a8494', 0.12),
                      color: ESTADO_COLOR[c.estado] ?? '#7a8494',
                    }}
                  />
                </Stack>
              ))}
              {citas.length === 0 && (
                <EmptyState
                  icon={CalendarMonthRounded}
                  title="Sin citas registradas"
                  description="Las citas que se agenden aparecerán aquí."
                />
              )}
            </Stack>
          </Paper>
        </Box>
      )}

      {/* Tip según rol */}
      <Box sx={[glassMustardSx, { borderRadius: '12px', p: 2.5 }]}>
        <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'primary.main', mb: 1 }}>
          {esPaciente ? 'Tip del día' : 'Nota'}
        </Typography>
        <Typography key={tip} variant="body2" sx={{ lineHeight: 1.7, animation: 'riseIn 0.5s ease-out' }}>
          {tip}
        </Typography>
      </Box>
    </Stack>
  )
}

export default HomePage
