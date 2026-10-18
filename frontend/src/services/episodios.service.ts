import { STORAGE_KEYS } from '@src/config/api'
import { haceDias, hoyHora } from '@src/helpers/dates'

// Episodios de estrés auto-reportados por el paciente (Monitoreo).
// Mock persistido en localStorage hasta que exista backend — el contrato de
// campos ya es el que se enviará a la API.

export interface Episodio {
  id: number
  ts: number // timestamp del registro
  level: number // intensidad 0–100
  mood: string
  trigger: string
  note?: string
}

export interface NuevoEpisodio {
  level: number
  mood: string
  trigger: string
  note?: string
}

const SEED: Episodio[] = [
  { id: 1, ts: hoyHora(9, 20), level: 62, mood: 'Ansioso', trigger: 'Trabajo', note: 'Antes de la presentación' },
  { id: 2, ts: haceDias(1, 18, 5), level: 38, mood: 'Tenso', trigger: 'Trabajo' },
  { id: 3, ts: haceDias(2, 12, 40), level: 24, mood: 'Calmado', trigger: 'Otro' },
  { id: 4, ts: haceDias(3, 21, 15), level: 71, mood: 'Abrumado', trigger: 'Familia', note: 'Discusión en casa' },
]

const read = (): Episodio[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.episodios)
    if (raw == null) return SEED
    return JSON.parse(raw) as Episodio[]
  } catch {
    return SEED
  }
}

const write = (episodios: Episodio[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.episodios, JSON.stringify(episodios))
  } catch {
    // localStorage lleno o bloqueado: el estado en memoria igual responde
  }
}

export const listEpisodios = (): Episodio[] =>
  [...read()].sort((a, b) => b.ts - a.ts)

export const createEpisodio = (input: NuevoEpisodio): Episodio => {
  const episodio: Episodio = { ...input, id: Date.now(), ts: Date.now() }
  write([episodio, ...read()])
  return episodio
}

export const deleteEpisodio = (id: number) => {
  write(read().filter((e) => e.id !== id))
}
