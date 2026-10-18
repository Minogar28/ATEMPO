import { STORAGE_KEYS } from '@src/config/api'
import { haceDias, hoyHora } from '@src/helpers/dates'

// Pausas activas completadas en Autorregulación (flujo PAUSA: mide → respira →
// relaja → emoción → mide de nuevo). Mock persistido en localStorage.

export interface Pausa {
  id: number
  ts: number
  antes: number // nivel de estrés antes de la pausa
  despues: number // nivel de estrés después de la pausa
  emocion: string
}

export interface NuevaPausa {
  antes: number
  despues: number
  emocion: string
}

const SEED: Pausa[] = [
  { id: 1, ts: hoyHora(8, 10), antes: 64, despues: 41, emocion: 'Tranquilo' },
  { id: 2, ts: haceDias(1, 17, 30), antes: 58, despues: 47, emocion: 'Aliviado' },
]

const read = (): Pausa[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.pausas)
    if (raw == null) return SEED
    return JSON.parse(raw) as Pausa[]
  } catch {
    return SEED
  }
}

const write = (pausas: Pausa[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.pausas, JSON.stringify(pausas))
  } catch {
    // localStorage lleno o bloqueado
  }
}

export const listPausas = (): Pausa[] =>
  [...read()].sort((a, b) => b.ts - a.ts)

export const createPausa = (input: NuevaPausa): Pausa => {
  const pausa: Pausa = { ...input, id: Date.now(), ts: Date.now() }
  write([pausa, ...read()])
  return pausa
}

export const deletePausa = (id: number) => {
  write(read().filter((p) => p.id !== id))
}
