import { useState } from 'react'
import { alertConfirm, swalFire } from '@src/helpers/alert'
import { createEpisodio, deleteEpisodio, listEpisodios } from '@src/services/episodios.service'
import type { Episodio } from '@src/services/episodios.service'
import type { WeekPoint } from '../types'

const weekData: WeekPoint[] = [
  { day: 'L', nivel: 42 },
  { day: 'M', nivel: 55 },
  { day: 'X', nivel: 38 },
  { day: 'J', nivel: 61 },
  { day: 'V', nivel: 47 },
  { day: 'S', nivel: 30 },
  { day: 'D', nivel: 52 },
]

// Los episodios persisten en localStorage (services/episodios.service.ts) y
// alimentan el estado del avatar; el backend reemplazará la capa de datos.
export type RangoFecha = '7d' | '30d' | 'todo'

const RANGO_DIAS: Record<Exclude<RangoFecha, 'todo'>, number> = { '7d': 7, '30d': 30 }

export const useMonitoreo = () => {
  const [episodes, setEpisodes] = useState<Episodio[]>(listEpisodios)
  const [level, setLevel] = useState(50)
  const [mood, setMood] = useState<string>('')
  const [trigger, setTrigger] = useState<string>('')
  const [note, setNote] = useState('')
  const [search, setSearch] = useState('')
  const [rango, setRango] = useState<RangoFecha>('todo')
  const [ahora] = useState(() => Date.now())

  const desde = rango === 'todo' ? null : ahora - RANGO_DIAS[rango] * 86_400_000
  const term = search.trim().toLowerCase()
  const episodesVisibles = episodes
    .filter((e) => desde == null || e.ts >= desde)
    .filter((e) => !term || `${e.mood} ${e.trigger} ${e.note ?? ''}`.toLowerCase().includes(term))

  const registrar = () => {
    if (!mood || !trigger) {
      void swalFire({ icon: 'warning', title: 'Faltan datos', text: 'Selecciona cómo te sientes y qué lo desencadenó.' })
      return
    }
    createEpisodio({ level, mood, trigger, note: note || undefined })
    setEpisodes(listEpisodios())
    setMood('')
    setTrigger('')
    setNote('')
    setLevel(50)
    void swalFire({ icon: 'success', title: 'Episodio registrado', timer: 1600, showConfirmButton: false })
  }

  const eliminar = async (id: number) => {
    const result = await alertConfirm('¿Eliminar episodio?', 'Este registro se quitará de tu historial.')
    if (!result.isConfirmed) return
    deleteEpisodio(id)
    setEpisodes(listEpisodios())
  }

  return {
    episodes: episodesVisibles,
    search, setSearch,
    rango, setRango,
    weekData,
    level, setLevel,
    mood, setMood,
    trigger, setTrigger,
    note, setNote,
    registrar, eliminar,
  }
}
