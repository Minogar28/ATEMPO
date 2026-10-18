export type { Cita, EstadoCita } from '@src/services/citas.service'

// Catálogo de psicólogos disponibles para reservar (mock; vendrá de
// GET /psicologos cuando exista el backend).
export interface Psicologo {
  id: number
  nombre: string
  especialidad: string
  rating: number
  disponibles: string[]
}
