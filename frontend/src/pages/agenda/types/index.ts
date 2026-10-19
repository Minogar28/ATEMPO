export type { Cita, EstadoCita } from '@src/services/citas.service'

// Horario reservable: un bloque de disponibilidad abierto por el psicólogo
// en Mi Panel → Mi agenda, formateado para el paciente.
export interface SlotDisponible {
  bloqueId: string
  fecha: string // "Lun 16 mar"
  hora: string // "09:00–10:00"
}

// Catálogo de psicólogos: proviene del registro de Gestión; sus horarios se
// derivan de los bloques reales de disponibilidad (services/disponibilidad).
export interface Psicologo {
  id: number
  nombre: string
  especialidad: string
  rating: number
  slots: SlotDisponible[]
}
