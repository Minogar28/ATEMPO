import { STORAGE_KEYS } from '@src/config/api'

// Bloques de disponibilidad que el psicólogo abre desde su calendario
// (Mi Panel → Mi agenda). Persisten en localStorage hasta que exista el
// backend; el paciente reserva sobre estos mismos bloques en Agenda.

export interface BloqueDisponible {
  id: string
  start: string // ISO
  end: string // ISO
  // Nombre del psicólogo que abrió el bloque. Bloques antiguos sin el campo
  // se muestran al paciente bajo el primer psicólogo del catálogo.
  psicologo?: string
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

// Bloques de la próxima semana repartidos entre los psicólogos del seed de
// Gestión, para que el paciente tenga horarios reservables desde el inicio.
const seed = (): BloqueDisponible[] => {
  const lun = nextMonday()
  const mk = (id: string, dia: number, h: number, psicologo: string): BloqueDisponible => ({
    id,
    start: at(lun, dia, h).toISOString(),
    end: at(lun, dia, h + 1).toISOString(),
    psicologo,
  })
  return [
    mk('b1', 0, 9, 'Dra. Camila Torres'),
    mk('b2', 0, 15, 'Dra. Camila Torres'),
    mk('b3', 2, 11, 'Dra. Camila Torres'),
    mk('b4', 1, 8, 'Dr. Andrés Mejía'),
    mk('b5', 3, 15, 'Dr. Andrés Mejía'),
    mk('b6', 4, 10, 'Dra. Laura Gómez'),
    mk('b7', 1, 17, 'Dra. Laura Gómez'),
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

// Etiquetas legibles para mostrar un bloque en la agenda del paciente.
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export const etiquetaBloque = (b: BloqueDisponible): { fecha: string; hora: string } => {
  const s = new Date(b.start)
  const e = new Date(b.end)
  const hh = (d: Date) =>
    `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  return {
    fecha: `${DIAS[s.getDay()]} ${s.getDate()} ${MESES[s.getMonth()]}`,
    hora: `${hh(s)}–${hh(e)}`,
  }
}
