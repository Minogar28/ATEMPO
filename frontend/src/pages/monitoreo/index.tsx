import { Box, Button, Chip, Grid, IconButton, Paper, Slider, Stack, TextField, Tooltip as MuiTooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DeleteRounded, SearchRounded } from '@mui/icons-material'
import { PageMetaData, SectionLabel, StressBar } from '@src/components'
import { fechaRelativa } from '@src/helpers/dates'
import { glassMustardSx, riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { stressColor } from '@src/theme/status'
import { useMonitoreo } from './hooks/useMonitoreo'
import { MOODS, TRIGGERS } from './types'

const MonitoreoPage = () => {
  const { episodes, search, setSearch, weekData, level, setLevel, mood, setMood, trigger, setTrigger, note, setNote, registrar, eliminar } =
    useMonitoreo()

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Monitoreo" />

      <Box>
        <Typography sx={{ fontFamily: displayFont, fontSize: '1.7rem' }}>Monitoreo</Typography>
        <Typography variant="body2" color="text.secondary">
          Registra y observa la evolución de tus episodios de estrés.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Formulario de registro */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <SectionLabel>Nuevo episodio</SectionLabel>

            <Typography sx={{ fontSize: '0.78rem', mb: 1 }}>
              Intensidad:{' '}
              <Box component="span" sx={{ fontFamily: monoFont, color: stressColor(level) }}>
                {level}
              </Box>
            </Typography>
            <Slider
              value={level}
              onChange={(_, v) => setLevel(v as number)}
              min={0}
              max={100}
              sx={{ mb: 2 }}
            />

            <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1 }}>
              ¿Cómo te sientes?
            </Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {MOODS.map((m) => (
                <Chip
                  key={m}
                  label={m}
                  size="small"
                  onClick={() => setMood(m)}
                  sx={{
                    bgcolor: mood === m ? alpha('#E2B84A', 0.18) : alpha('#ffffff', 0.05),
                    border: `1px solid ${alpha(mood === m ? '#E2B84A' : '#ffffff', mood === m ? 0.4 : 0.1)}`,
                    color: mood === m ? '#E2B84A' : 'text.secondary',
                  }}
                />
              ))}
            </Stack>

            <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1 }}>
              ¿Qué lo desencadenó?
            </Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {TRIGGERS.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  onClick={() => setTrigger(t)}
                  sx={{
                    bgcolor: trigger === t ? alpha('#60a5fa', 0.15) : alpha('#ffffff', 0.05),
                    border: `1px solid ${alpha(trigger === t ? '#60a5fa' : '#ffffff', trigger === t ? 0.4 : 0.1)}`,
                    color: trigger === t ? '#60a5fa' : 'text.secondary',
                  }}
                />
              ))}
            </Stack>

            <TextField
              placeholder="Nota opcional…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              multiline
              minRows={2}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" fullWidth onClick={registrar}>
              Registrar episodio
            </Button>
          </Paper>
        </Grid>

        {/* Evolución semanal + historial */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Paper sx={{ p: 2.5 }}>
              <SectionLabel>Evolución semanal</SectionLabel>
              <Box sx={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekData}>
                    <defs>
                      <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E2B84A" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#E2B84A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: 'rgba(250,246,237,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ background: 'rgba(31,58,95,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="nivel" stroke="#E2B84A" strokeWidth={2} fill="url(#stressGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            <Paper sx={{ p: 2.5, flex: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, mb: 1.5 }}>
                <SectionLabel>Historial</SectionLabel>
                <TextField
                  size="small"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar episodio…"
                  slotProps={{ input: { startAdornment: <SearchRounded sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} /> } }}
                  sx={{ minWidth: 200 }}
                />
              </Stack>
              <Stack spacing={1.5} sx={{ maxHeight: 260, overflowY: 'auto', pr: 0.5 }}>
                {episodes.map((ep) => (
                  <Stack key={ep.id} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: stressColor(ep.level), flexShrink: 0 }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{ep.mood}</Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }} noWrap>
                          {ep.trigger}
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled' }}>
                        {fechaRelativa(ep.ts)}{ep.note ? ` · ${ep.note}` : ''}
                      </Typography>
                    </Box>
                    <Box sx={{ width: 80 }}><StressBar value={ep.level} showValue={false} /></Box>
                    <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem', color: stressColor(ep.level), width: 24, textAlign: 'right' }}>
                      {ep.level}
                    </Typography>
                    <MuiTooltip title="Eliminar episodio">
                      <IconButton size="small" onClick={() => void eliminar(ep.id)} aria-label="Eliminar episodio">
                        <DeleteRounded sx={{ fontSize: 15, color: 'rgba(248,113,113,0.7)' }} />
                      </IconButton>
                    </MuiTooltip>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Zona psicoeducativa */}
      <Box sx={[glassMustardSx, { borderRadius: 5, p: 2.5 }]}>
        <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'primary.main', mb: 1 }}>
          Comprender tu semáforo
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
          <Box component="span" sx={{ color: '#4ade80' }}>Verde (0–34):</Box> estado regulado.{' '}
          <Box component="span" sx={{ color: '#E2B84A' }}>Amarillo (35–64):</Box> activación moderada — una pausa activa puede ayudar.{' '}
          <Box component="span" sx={{ color: '#f87171' }}>Rojo (65+):</Box> alta activación — prioriza una técnica de autorregulación y, si persiste, coméntalo con tu psicólogo.
        </Typography>
      </Box>
    </Stack>
  )
}

export default MonitoreoPage
