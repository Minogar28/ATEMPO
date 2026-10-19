import { useSyncExternalStore } from 'react'
import { Avatar, Box, Grid, MenuItem, Paper, Select, Stack, Tooltip as MuiTooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { LockRounded } from '@mui/icons-material'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader, PageMetaData, SectionLabel, SegmentedTabs, StressBar } from '@src/components'
import { glassMustardSx, riseInSx } from '@src/theme/brand'
import { monoFont } from '@src/theme/typography'
import { stressColor } from '@src/theme/status'
import { getLogoEmpresa, subscribePerfil } from '@src/services/perfil.service'
import { METRICA_EXPLICACIONES } from '@src/services/tips.service'
import { useEmpresa } from './hooks/useEmpresa'

const chartTooltip = {
  background: 'rgba(31,58,95,0.95)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 10,
  fontSize: 12,
}

const EmpresaPage = () => {
  const { empresa, setEmpresa, empresas, tab, setTab, kpis, tendencia, areas, psicologos } = useEmpresa()
  const logo = useSyncExternalStore(subscribePerfil, getLogoEmpresa)

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Empresas" />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Avatar
            src={logo ?? undefined}
            variant="rounded"
            sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: 'rgba(226,184,74,0.1)', color: 'primary.main' }}
          >
            {empresa.slice(0, 1)}
          </Avatar>
          <PageHeader title="Panel de empresa" subtitle="Métricas agregadas y anonimizadas de bienestar." />
        </Stack>
        <Select
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          size="small"
          sx={{ minWidth: 220, alignSelf: { sm: 'center' } }}
        >
          {empresas.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
        </Select>
      </Stack>

      <Grid container spacing={2}>
        {kpis.map((k) => (
          <Grid key={k.id} size={{ xs: 6, md: 3 }}>
            <MuiTooltip title={METRICA_EXPLICACIONES[k.id] ?? ''} arrow placement="top">
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography sx={{ fontFamily: monoFont, fontSize: '1.5rem', color: k.color }}>{k.value}</Typography>
                {k.delta && (
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: k.color }}>
                    {k.delta}
                  </Typography>
                )}
              </Stack>
              <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {k.label}
              </Typography>
            </Paper>
            </MuiTooltip>
          </Grid>
        ))}
      </Grid>

      <SegmentedTabs
        tabs={[
          { id: 'tendencia', label: 'Tendencia' },
          { id: 'areas', label: 'Áreas' },
          { id: 'psicologos', label: 'Psicólogos' },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === 'tendencia' && (
        <Paper sx={{ p: 2.5, height: 280 }}>
          <SectionLabel>Estrés promedio vs participación</SectionLabel>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={tendencia}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fill: 'rgba(250,246,237,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(250,246,237,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltip} />
              <Line type="monotone" dataKey="estres" stroke="#E2B84A" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="participacion" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {tab === 'areas' && (
        <Paper sx={{ p: 2.5, height: 280 }}>
          <SectionLabel>Estrés por área</SectionLabel>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={areas} layout="vertical">
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis type="category" dataKey="area" tick={{ fill: 'rgba(250,246,237,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={chartTooltip} />
              <Bar dataKey="estres" fill="#E2B84A" radius={[0, 6, 6, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {tab === 'psicologos' && (
        <Paper sx={{ p: 2.5 }}>
          <SectionLabel>Rendimiento del equipo</SectionLabel>
          <Stack spacing={1.5}>
            {psicologos.map((p) => (
              <Stack key={p.id} direction="row" spacing={2} sx={{ alignItems: 'center', p: 1.5, borderRadius: 4, background: alpha('#ffffff', 0.04) }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.nombre}</Typography>
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.secondary' }}>
                    {p.pacientes} pacientes · {p.citas} citas
                  </Typography>
                </Box>
                <Box sx={{ width: 120 }}>
                  <StressBar value={p.estresProm} label="Estrés prom." />
                </Box>
                <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem', color: stressColor(p.estresProm), width: 26, textAlign: 'right' }}>
                  {p.estresProm}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      )}

      <Stack direction="row" spacing={1.5} sx={[glassMustardSx, { borderRadius: 4, p: 2, alignItems: 'center' }]}>
        <LockRounded sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', lineHeight: 1.6 }}>
          Los datos de bienestar se muestran de forma agregada y anonimizada. Ninguna empresa puede ver el estado clínico individual de un empleado — solo tendencias y agregados por área.
        </Typography>
      </Stack>
    </Stack>
  )
}

export default EmpresaPage
