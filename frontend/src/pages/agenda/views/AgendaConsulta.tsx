import { Avatar, Chip, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { DataTable, SectionLabel } from '@src/components'
import type { DataTableColumn } from '@src/components'
import { useAgenda } from '../hooks/useAgenda'
import type { Cita } from '../types'

const ESTADO_COLOR: Record<string, string> = {
  confirmada: '#4ade80',
  pendiente: '#E2B84A',
  completada: '#60a5fa',
  cancelada: '#7a8494',
}

const columns: DataTableColumn<Cita>[] = [
  {
    id: 'psicologo',
    label: 'Psicólogo',
    render: (c) => (
      <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
        <Avatar sx={{ width: 28, height: 28, borderRadius: 2, fontSize: '0.7rem' }}>{c.psicologo.slice(4, 5)}</Avatar>
        <Typography variant="body2">{c.psicologo}</Typography>
      </Stack>
    ),
  },
  { id: 'fecha', label: 'Fecha' },
  { id: 'hora', label: 'Hora' },
  { id: 'modalidad', label: 'Modalidad' },
  {
    id: 'estado',
    label: 'Estado',
    render: (c) => (
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
    ),
  },
]

// Vista de solo consulta (empresa / superadmin): lee el mismo store de citas
// que el paciente, sin acciones de reserva ni cancelación.
const AgendaConsulta = () => {
  const { citas } = useAgenda()

  return (
    <Paper sx={{ p: 2.5 }}>
      <SectionLabel>Agenda — solo lectura</SectionLabel>
      <DataTable<Cita>
        rows={citas}
        columns={columns}
        getRowId={(c) => c.id}
        searchable={(c) => `${c.psicologo} ${c.estado}`}
      />
    </Paper>
  )
}

export default AgendaConsulta
