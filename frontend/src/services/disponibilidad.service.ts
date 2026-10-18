import { STORAGE_KEYS } from '@src/config/api'

// Bloques de disponibilidad que el psicólogo abre desde su calendario.
// Persisten en localStorage hasta que exista el backend; el paciente podrá
// reservar sobre estos mismos bloques.

export interface BloqueDisponible {
  id: string
  start: string // ISO
  end: string // ISO
}

const KEY = `${STORAGE_KEYS.gestion}.disponibilidad`

const nextMonday = (): Date => {
  const d = new Date()
  const day = d.getDay() // 0 dom, 1 lun…
  d.setDate(d.getDate() + ((8 - day) % 7))
  d.setHours(0, 0, 0, 0)
  return d
}

const at = (base: Date, dayOffset: number, h: number, m = 0): Date => {
  const d = new Date(base)
  d.setDate(d.getDate() + dayOffset)
  d.setHours(h, m, 0, 0)
  return d
}

const seed = (): BloqueDisponible[] => {
  const lun = nextMonday()
  return [
    { id: 'b1', start: at(lun, 0, 9).toISOString(), end: at(lun, 0, 10).toISOString() },
    { id: 'b2', start: at(lun, 0, 15).toISOString(), end: at(lun, 0, 16).toISOString() },
    { id: 'b3', start: at(lun, 2, 11).toISOString(), end: at(lun, 2, 12).toISOString() },
    { id: 'b4', start: at(lun, 3, 14).toISOString(), end: at(lun, 3, 15).toISOString() },
    { id: 'b5', start: at(lun, 4, 10).toISOString(), end: at(lun, 4, 11).toISOString() },
  ]
}

const read = (): BloqueDisponible[] => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      const initial = seed()
      localStorage.setItem(KEY, JSON.stringify(initial))
      return initial
    }
    const parsed = JSON.parse(raw) as BloqueDisponible[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const write = (bloques: BloqueDisponible[]) =>
  localStorage.setItem(KEY, JSON.stringify(bloques))

export const listBloques = (): BloqueDisponible[] =>
  read().sort((a, b) => a.start.localeCompare(b.start))

export const createBloque = (input: Omit<BloqueDisponible, 'id'>): BloqueDisponible => {
  const bloque: BloqueDisponible = { ...input, id: `b-${Date.now()}` }
  write([...read(), bloque])
  return bloque
}

export const deleteBloque = (id: string): void => {
  write(read().filter((b) => b.id !== id))
}
