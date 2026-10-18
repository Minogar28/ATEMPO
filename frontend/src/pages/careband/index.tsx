import { Box, Chip, Grid, Paper, Stack, Switch, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { Gauge, PageMetaData, SectionLabel } from '@src/components'
import { riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { useCareband } from './hooks/useCareband'

const MiniStat = ({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) => (
  <Paper sx={{ p: 2 }}>
    <Typography sx={{ fontFamily: monoFont, fontSize: '1.5rem', color }}>{value}</Typography>
    <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {label} · {unit}
    </Typography>
  </Paper>
)

const CarebandPage = () => {
  const { connected, toggleConnected, vitals, trend } = useCareband()

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="CAREband" />

      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ fontFamily: displayFont, fontSize: '1.7rem' }}>CAREband</Typography>
          <Typography variant="body2" color="text.secondary">
            Signos vitales en tiempo real desde tu dispositivo.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip
            size="small"
            label={connected ? 'Conectada' : 'Desconectada'}
            sx={{
              bgcolor: alpha(connected ? '#4ade80' : '#f87171', 0.15),
              color: connected ? '#4ade80' : '#f87171',
              border: `1px solid ${alpha(connected ? '#4ade80' : '#f87171', 0.35)}`,
            }}
          />
          <Switch checked={connected} onChange={toggleConnected} size="small" />
        </Stack>
      </Stack>

      {connected ? (
        <>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-around' }}>
              <Grid size="auto"><Gauge value={vitals.hr} min={40} max={160} unit="bpm" label="Frec. cardíaca" color="#f87171" /></Grid>
              <Grid size="auto"><Gauge value={vitals.spo2} min={80} max={100} unit="%" label="SpO₂" color="#60a5fa" /></Grid>
              <Grid size="auto"><Gauge value={vitals.temp} min={34} max={40} unit="°C" label="Temperatura" color="#E2B84A" /></Grid>
            </Grid>
          </Paper>

          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 3 }}><MiniStat label="GSR" value={vitals.gsr} unit="µS" color="#c084fc" /></Grid>
            <Grid size={{ xs: 6, md: 3 }}><MiniStat label="HRV" value={vitals.hrv} unit="ms" color="#4ade80" /></Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>
                  Estado
                </Typography>
                <Typography variant="body2">Lectura estable · sin episodios activos</Typography>
                <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.disabled', mt: 0.5 }}>
                  sync {new Date().toLocaleTimeString('es')}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box>
            <SectionLabel>Frecuencia cardíaca · últimos 2 min</SectionLabel>
            <Paper sx={{ p: 2, height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <Tooltip
                    contentStyle={{ background: 'rgba(31,58,95,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, fontSize: 12 }}
                    labelStyle={{ color: '#FAF6ED' }}
                  />
                  <Area type="monotone" dataKey="hr" stroke="#f87171" strokeWidth={2} fill="url(#hrGrad)" dot={false} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        </>
      ) : (
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: displayFont, fontSize: '1.2rem', mb: 1 }}>
            CAREband desconectada
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Activa el interruptor para reanudar la lectura de signos vitales.
          </Typography>
        </Paper>
      )}
    </Stack>
  )
}

export default CarebandPage
