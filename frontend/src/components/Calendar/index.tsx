import { useMemo, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import type { EventClickArg } from '@fullcalendar/core'
import type { BloqueDisponible } from '@src/services/disponibilidad.service'
import AgendaCalendar from './Calendar'
import SlotDialog from './AddEditEvent'
import AgendaSidePanel from './SidePanel'
import { bloqueToEvent, citaToEvent, formatRange } from './helper'
import type { CitaEvento, SlotDialogState } from './helper'

export interface AgendaCalendarioProps {
  bloques: BloqueDisponible[]
  citas?: CitaEvento[]
  onAbrir: (start: Date, end: Date) => void
  onQuitar: (bloqueId: string) => void
}

// Calendario semanal de disponibilidad del psicólogo: arrastrar abre un
// bloque, tocar un bloque verde lo quita. Las citas se ven en mustard.
const AgendaCalendario = ({ bloques, citas = [], onAbrir, onQuitar }: AgendaCalendarioProps) => {
  const [dialog, setDialog] = useState<SlotDialogState | null>(null)
  const [pendingRange, setPendingRange] = useState<{ start: Date; end: Date } | null>(null)

  const events = useMemo(
    () => [...bloques.map(bloqueToEvent), ...citas.map(citaToEvent)],
    [bloques, citas],
  )

  const handleSelect = (start: Date, end: Date) => {
    setPendingRange({ start, end })
    setDialog({ mode: 'abrir', label: formatRange(start, end) })
  }

  const handleEventClick = (arg: EventClickArg) => {
    const bloqueId = arg.event.extendedProps.bloqueId as string | undefined
    if (!bloqueId) return // las citas no se tocan desde aquí
    const bloque = bloques.find((b) => b.id === bloqueId)
    if (!bloque) return
    setDialog({
      mode: 'quitar',
      label: formatRange(new Date(bloque.start), new Date(bloque.end)),
      payload: bloqueId,
    })
  }

  const handleConfirm = (state: SlotDialogState) => {
    if (state.mode === 'abrir' && pendingRange) {
      onAbrir(pendingRange.start, pendingRange.end)
    } else if (state.mode === 'quitar' && state.payload) {
      onQuitar(state.payload)
    }
    setDialog(null)
    setPendingRange(null)
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <AgendaSidePanel totalBloques={bloques.length} />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Paper sx={{ p: 2.5 }}>
          <AgendaCalendar
            events={events}
            onSelect={handleSelect}
            onEventClick={handleEventClick}
          />
        </Paper>
      </Grid>
      <SlotDialog state={dialog} onClose={() => setDialog(null)} onConfirm={handleConfirm} />
    </Grid>
  )
}

export default AgendaCalendario
