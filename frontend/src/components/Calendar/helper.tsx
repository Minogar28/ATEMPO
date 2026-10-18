import type { EventInput } from '@fullcalendar/core'
import type { BloqueDisponible } from '@src/services/disponibilidad.service'

// Colores del mundo visual: verde = disponibilidad abierta, mustard = cita.
export const COLOR_DISPONIBLE = '#4ade80'
export const COLOR_CITA = '#E2B84A'

export interface CitaEvento {
  id: string
  title: string
  start: string // ISO
}

export interface SlotDialogState {
  mode: 'abrir' | 'quitar'
  label: string // texto legible del horario
  payload?: string // id del bloque cuando se quita
}

export const formatRange = (start: Date, end: Date): string => {
  const dia = start.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })
  const desde = start.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })
  const hasta = end.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })
  return `${dia} · ${desde}–${hasta}`
}

export const bloqueToEvent = (b: BloqueDisponible): EventInput => ({
  id: `bloque-${b.id}`,
  title: 'Disponible',
  start: b.start,
  end: b.end,
  backgroundColor: 'rgba(74,222,128,0.16)',
  borderColor: 'rgba(74,222,128,0.45)',
  textColor: COLOR_DISPONIBLE,
  classNames: ['ev-bloque'],
  extendedProps: { bloqueId: b.id },
})

export const citaToEvent = (c: CitaEvento): EventInput => ({
  id: `cita-${c.id}`,
  title: c.title,
  start: c.start,
  backgroundColor: 'rgba(226,184,74,0.16)',
  borderColor: 'rgba(226,184,74,0.45)',
  textColor: COLOR_CITA,
  classNames: ['ev-cita'],
})
