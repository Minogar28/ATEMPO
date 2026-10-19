import { Avatar, Box, Button, Chip, Grid, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { CloseRounded, EventBusyRounded, SearchRounded, StarRounded, VideocamRounded } from '@mui/icons-material'
import { EmptyState, SectionLabel } from '@src/components'
import { monoFont } from '@src/theme/typography'
import { useAgenda } from '../hooks/useAgenda'
import SesionVirtual from './SesionVirtual'

const ESTADO_COLOR: Record<string, string> = {
  confirmada: '#4ade80',
  pendiente: '#E2B84A',
  completada: '#60a5fa',
  cancelada: '#7a8494',
}

// Vista del paciente: catálogo de psicólogos con horarios siempre visibles +
// grid de mis citas. Cada tarjeta gestiona su propia selección de horario.
const AgendaPaciente = () => {
  const {
    psicologos, citas, search, setSearch,
    seleccionado, slot, seleccionar,
    sesion, entrar, finalizarSesion,
    reservar, cancelar,
  } = useAgenda()

  if (sesion) return <SesionVirtual cita={sesion} onFinalizar={finalizarSesion} />

  return (
    <Stack spacing={3}>
      {/* Catálogo de psicólogos */}
      <Paper sx={{ p: 2.5 }}>
        <SectionLabel>Psicólogos disponibles</SectionLabel>
        <Grid container spacing={2}>
          {psicologos.map((p) => {
            const esSeleccionada = seleccionado?.id === p.id
            return (
              <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    p: 2.25,
                    borderRadius: 3,
                    height: '100%',
                    background: alpha('#ffffff', esSeleccionada ? 0.06 : 0.03),
                    border: `1px solid ${alpha(esSeleccionada ? '#E2B84A' : '#ffffff', esSeleccionada ? 0.3 : 0.08)}`,
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1.5 }}>
                    <Avatar sx={{ width: 44, height: 44, borderRadius: 3, fontSize: '0.95rem' }}>
                      {p.nombre.slice(4, 5)}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>{p.nombre}</Typography>
                      <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }} noWrap>
                        {p.especialidad}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', flexShrink: 0 }}>
                      <StarRounded sx={{ fontSize: 14, color: '#E2B84A' }} />
                      <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem' }}>{p.rating}</Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                    {p.slots.map((s) => {
                      const activo = esSeleccionada && slot?.bloqueId === s.bloqueId
                      return (
                        <Chip
                          key={s.bloqueId}
                          label={`${s.fecha} · ${s.hora}`}
                          size="small"
                          onClick={() => seleccionar(p, s)}
                          sx={{
                            fontFamily: monoFont,
                            fontSize: '0.62rem',
                            bgcolor: activo ? alpha('#E2B84A', 0.18) : alpha('#ffffff', 0.05),
                            border: `1px solid ${alpha(activo ? '#E2B84A' : '#ffffff', activo ? 0.4 : 0.1)}`,
                            color: activo ? '#E2B84A' : 'text.secondary',
                          }}
                        />
                      )
                    })}
                    {p.slots.length === 0 && (
                      <Typography sx={{ fontSize: '0.68rem', color: 'text.disabled', fontStyle: 'italic' }}>
                        Sin horarios abiertos esta semana
                      </Typography>
                    )}
                  </Stack>

                  <Button
                    variant="contained"
                    size="small"
                    disabled={!(esSeleccionada && slot)}
                    onClick={reservar}
                    sx={{ mt: 'auto' }}
                  >
                    {esSeleccionada && slot ? `Reservar ${slot.fecha} ${slot.hora}` : 'Elige un horario'}
                  </Button>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Paper>

      {/* Mis citas */}
      <Paper sx={{ p: 2.5 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, mb: 2 }}>
          <SectionLabel>Mis citas</SectionLabel>
          <TextField
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cita…"
            slotProps={{ input: { startAdornment: <SearchRounded sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} /> } }}
            sx={{ minWidth: 220 }}
          />
        </Stack>
        <Grid container spacing={2}>
          {citas.map((c) => {
            const activa = c.estado === 'confirmada' || c.estado === 'pendiente'
            return (
              <Grid key={c.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    p: 2.25,
                    borderRadius: 3,
                    height: '100%',
                    background: alpha('#ffffff', 0.04),
                    border: '1px solid rgba(255,255,255,0.08)',
                    opacity: c.estado === 'cancelada' ? 0.55 : 1,
                  }}
                >
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Avatar sx={{ width: 40, height: 40, borderRadius: 2.5, fontSize: '0.85rem' }}>
                      {c.psicologo.slice(4, 5)}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>{c.psicologo}</Typography>
                      <Typography sx={{ fontFamily: monoFont, fontSize: '0.68rem', color: 'text.secondary' }}>
                        {c.fecha} · {c.hora}
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

                  {activa && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1.5, pt: 1.25, borderTop: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                      {c.modalidad === 'virtual' && (
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<VideocamRounded />}
                          onClick={() => entrar(c)}
                          sx={{ fontSize: '0.72rem', flex: 1 }}
                        >
                          Entrar a cita
                        </Button>
                      )}
                      <Tooltip title="Cancelar cita">
                        <IconButton size="small" onClick={() => void cancelar(c)} aria-label={`Cancelar cita con ${c.psicologo}`}>
                          <CloseRounded sx={{ fontSize: 16, color: 'text.secondary' }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  )}
                </Box>
              </Grid>
            )
          })}
        </Grid>
        {citas.length === 0 && (
          <EmptyState
            icon={EventBusyRounded}
            title="Aún no tienes citas"
            description="Elige un horario disponible en las tarjetas de arriba para agendar tu primera sesión."
          />
        )}
      </Paper>
    </Stack>
  )
}

export default AgendaPaciente
