import { diaKey } from '@src/helpers/dates'
import { listCitas } from './citas.service'
import { listEpisodios } from './episodios.service'
import { listPausas } from './pausas.service'

// Proyección de bienestar: agrega lo que el paciente ha hecho en la plataforma
// (episodios + pausas + citas) y deriva el estado que consume el módulo Avatar:
// XP, nivel, clima, insignias (vía conteos) y actividad reciente. Cuando llegue
// el backend esto será GET /bienestar/resumen.

export type Clima = 'storm' | 'cloud' | 'sun'

export interface ActividadItem {
  id: string
  ts: number
  texto: string
}

export interface BienestarResumen {
  xp: number
  nivel: number
  progresoNivel: number
  clima: Clima
  ultimoEstres: number | null
  estresPromedio: number | null
  totalEpisodios: number
  totalPausas: number
  citasAsistidas: number
  citasProximas: number
  diasActivos: number
  actividad: ActividadItem[]
}

const XP_EPISODIO = 30
const XP_PAUSA = 80
const XP_CITA = 60
const XP_BASE = 120

export const resumenBienestar = (): BienestarResumen => {
  const episodios = listEpisodios() // ya vienen por ts desc
  const pausas = listPausas()
  const citas = listCitas()

  const ultimoEstres = episodios[0]?.level ?? null
  const clima: Clima = (ultimoEstres ?? 42) >= 65 ? 'storm' : (ultimoEstres ?? 42) >= 35 ? 'cloud' : 'sun'

  const estresPromedio = episodios.length
    ? Math.round(episodios.reduce((acc, e) => acc + e.level, 0) / episodios.length)
    : null

  const citasAsistidas = citas.filter((c) => c.estado === 'completada').length
  const citasProximas = citas.filter((c) => c.estado === 'confirmada' || c.estado === 'pendiente').length

  const dias = new Set<string>()
  for (const e of episodios) dias.add(diaKey(e.ts))
  for (const p of pausas) dias.add(diaKey(p.ts))
  for (const c of citas) dias.add(diaKey(c.ts))

  const xp = XP_BASE + episodios.length * XP_EPISODIO + pausas.length * XP_PAUSA + citasAsistidas * XP_CITA
  const nivel = Math.floor(xp / 500)

  const actividad: ActividadItem[] = [
    ...episodios.map((e): ActividadItem => ({ id: `ep-${e.id}`, ts: e.ts, texto: `Episodio registrado (${e.level})` })),
    ...pausas.map((p): ActividadItem => ({
      id: `pa-${p.id}`,
      ts: p.ts,
      texto: `Pausa activa completada · bajaste ${Math.max(0, p.antes - p.despues)} pts`,
    })),
    ...citas.map((c): ActividadItem => ({
      id: `ci-${c.id}`,
      ts: c.ts,
      texto: c.estado === 'completada' ? `Cita con ${c.psicologo} completada` : `Cita con ${c.psicologo} (${c.estado})`,
    })),
  ]
  actividad.sort((a, b) => b.ts - a.ts)

  return {
    xp,
    nivel,
    progresoNivel: ((xp % 500) / 500) * 100,
    clima,
    ultimoEstres,
    estresPromedio,
    totalEpisodios: episodios.length,
    totalPausas: pausas.length,
    citasAsistidas,
    citasProximas,
    diasActivos: dias.size,
    actividad: actividad.slice(0, 6),
  }
}
