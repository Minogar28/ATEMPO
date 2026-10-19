import { Box, Button, CircularProgress, Grid, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { DownloadRounded, LockRounded, SearchRounded } from '@mui/icons-material'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader, PageMetaData, SectionLabel } from '@src/components'
import { glassMustardSx, riseInSx } from '@src/theme/brand'

import { monoFont } from '@src/theme/typography'
import { useReportes } from './hooks/useReportes'

const Filtro = ({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) => (
  <Box>
    <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>
      {label}
    </Typography>
    <Select size="small" value={value} onChange={(e) => onChange(e.target.value)} fullWidth>
      {options.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
    </Select>
  </Box>
)

const ReportesPage = () => {
  const { tipos, conteos, search, setSearch, preview, periodo, setPeriodo, area, setArea, empresa, setEmpresa, generando, generar } =
    useReportes()

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Reportes" />

      <PageHeader title="Reportes" subtitle="Genera informes de bienestar con alcance según tu rol." />

      {/* Filtros */}
      <Paper sx={{ p: 2.5 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Filtro label="Período" value={periodo} onChange={setPeriodo} options={[
              { value: 'semana', label: 'Última semana' },
              { value: 'ultimo-mes', label: 'Último mes' },
              { value: 'trimestre', label: 'Último trimestre' },
              { value: 'anual', label: 'Anual' },
            ]} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Filtro label="Área" value={area} onChange={setArea} options={[
              { value: 'todas', label: 'Todas las áreas' },
              { value: 'operaciones', label: 'Operaciones' },
              { value: 'ventas', label: 'Ventas' },
              { value: 'tecnologia', label: 'Tecnología' },
            ]} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Filtro label="Empresa" value={empresa} onChange={setEmpresa} options={[
              { value: 'todas', label: 'Todas las empresas' },
              { value: 'techcorp', label: 'TechCorp Colombia' },
              { value: 'nova', label: 'Grupo Nova' },
            ]} />
          </Grid>
        </Grid>
      </Paper>

      {/* Preview */}
      <Paper sx={{ p: 2.5, height: 240 }}>
        <SectionLabel>Vista previa — estrés y episodios por semana</SectionLabel>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={preview}>
            <defs>
              <linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E2B84A" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#E2B84A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="periodo" tick={{ fill: 'rgba(250,246,237,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(250,246,237,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'rgba(31,58,95,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, fontSize: 12 }} />
            <Area type="monotone" dataKey="estres" stroke="#E2B84A" strokeWidth={2} fill="url(#repGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>

      {/* Tipos de reporte */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}>
        <SectionLabel>Informes disponibles</SectionLabel>
        <TextField
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar informe…"
          slotProps={{ input: { startAdornment: <SearchRounded sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} /> } }}
          sx={{ minWidth: 220 }}
        />
      </Stack>
      <Grid container spacing={2}>
        {tipos.map((t) => (
          <Grid key={t.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{t.nombre}</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.5, flex: 1 }}>
                {t.descripcion}
              </Typography>
              <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: conteos[t.id] ? 'text.secondary' : 'text.disabled', mt: 1 }}>
                {conteos[t.id] ? `${conteos[t.id]} registro(s) listos` : 'Sin datos aún'}
              </Typography>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography sx={{ fontSize: '0.62rem', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {t.formato}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={generando === t.id ? <CircularProgress size={12} /> : <DownloadRounded />}
                  onClick={() => void generar(t)}
                  disabled={generando !== null}
                  sx={{ fontSize: '0.72rem' }}
                >
                  Generar
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" spacing={1.5} sx={[glassMustardSx, { borderRadius: 4, p: 2, alignItems: 'center' }]}>
        <LockRounded sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', lineHeight: 1.6 }}>
          Los reportes de empresa y administración solo incluyen datos agregados. Los reportes clínicos individuales requieren rol de psicólogo y consentimiento informado del paciente.
        </Typography>
      </Stack>
    </Stack>
  )
}

export default ReportesPage
