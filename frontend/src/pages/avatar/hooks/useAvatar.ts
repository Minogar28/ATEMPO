import { fechaRelativa } from '@src/helpers/dates'
import { resumenBienestar } from '@src/services/bienestar.service'
import type { Activity, Badge, NivelClima } from '../types'

// El avatar se alimenta de la actividad persistida: episodios (monitoreo),
// pausas activas (autorregulación) y citas (agenda) vía resumenBienestar().
export const useAvatar = () => {
  const resumen = resumenBienestar()
  const clima = resumen.clima

  const niveles: NivelClima[] = [
    { id: 'storm', label: 'Tormenta', rango: 'Estrés 65–100', actual: clima === 'storm' },
    { id: 'cloud', label: 'Nublado', rango: 'Estrés 35–64', actual: clima === 'cloud' },
    { id: 'sun', label: 'Despejado', rango: 'Estrés 0–34', actual: clima === 'sun' },
  ]

  const badges: Badge[] = [
    { id: 1, nombre: 'Primera pausa', descripcion: 'Completa una pausa activa', obtenido: resumen.totalPausas >= 1 },
    { id: 2, nombre: 'Racha 7 días', descripcion: 'Registra actividad 7 días distintos', obtenido: resumen.diasActivos >= 7 },
    { id: 3, nombre: 'Respirador', descripcion: 'Completa 10 pausas activas', obtenido: resumen.totalPausas >= 10 },
    { id: 4, nombre: 'Constancia', descripcion: 'Registra 30 episodios', obtenido: resumen.totalEpisodios >= 30 },
    { id: 5, nombre: 'Clima estable', descripcion: 'Tu último registro está en zona verde', obtenido: resumen.ultimoEstres != null && resumen.ultimoEstres < 35 },
    { id: 6, nombre: 'Mentor', descripcion: 'Ayuda a otro paciente (próximamente)', obtenido: false },
  ]

  const actividad: Activity[] = resumen.actividad.map((a, i) => ({
    id: i,
    texto: a.texto,
    fecha: fechaRelativa(a.ts),
  }))

  return {
    clima, niveles, badges, actividad,
    xp: resumen.xp,
    nivelXp: resumen.nivel,
    progresoNivel: resumen.progresoNivel,
  }
}
