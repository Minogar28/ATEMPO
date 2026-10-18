export type { Episodio } from '@src/services/episodios.service'

export interface WeekPoint {
  day: string
  nivel: number
}

export const MOODS = ['Calmado', 'Tenso', 'Ansioso', 'Irritable', 'Agotado', 'Abrumado'] as const
export const TRIGGERS = ['Trabajo', 'Familia', 'Salud', 'Estudio', 'Social', 'Otro'] as const
