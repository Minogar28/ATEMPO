import { useMemo } from 'react'
import { useAuth } from '@src/states/AuthContext'
import { fechaRelativa } from '@src/helpers/dates'
import { resumenBienestar } from '@src/services/bienestar.service'
import { listCitas } from '@src/services/citas.service'
import { listEpisodios } from '@src/services/episodios.service'
import { listGuias } from '@src/services/guias.service'
import { listRegistros } from '@src/services/gestion.service'
import type { Episode, HomeStat, QuickAction } from '../types'

const greetingByHour = (hour: number): string => {
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

const TIPS: Record<string, string> = {
  paciente: 'Cuando notes tensión, prueba respirar 4-7-8: inhala 4s, retén 7s, exhala 8s. Tres ciclos bastan para bajar la activación fisiológica.',
  psicologo: 'Las guías en video que publicas en Mi Panel aparecen en Autorregulación, el espacio de tus pacientes.',
  default: 'Los reportes descargables consolidan toda la información guardada en la plataforma.',
}

// El inicio es congruente con el rol: el paciente ve su bienestar, el psicólogo
// su operación clínica y empresa/superadmin la vista administrativa.
export const useHome = () => {
  const { user } = useAuth()
  const rol = user?.roles[0] ?? 'paciente'
  const esPaciente = rol === 'paciente'
  const firstName = user?.name.split(' ')[0] ?? ''

  const greeting = useMemo(
    () => `${greetingByHour(new Date().getHours())}, ${firstName}`,
    [firstName],
  )

  const resumen = resumenBienestar()

  const stats: HomeStat[] = esPaciente
    ? [
        { id: 'sesiones', label: 'Sesiones', value: resumen.totalPausas + resumen.citasAsistidas, hint: 'completadas' },
        { id: 'racha', label: 'Racha', value: `${resumen.diasActivos}d`, hint: 'días activos' },
        { id: 'estres', label: 'Estrés prom.', value: resumen.estresPromedio ?? '—', hint: 'de tus registros' },
        { id: 'xp', label: 'XP', value: resumen.xp, hint: 'acumulado' },
      ]
    : rol === 'psicologo'
      ? [
          { id: 'pacientes', label: 'Pacientes', value: listRegistros('pacientes').filter((p) => p.values.psicologo === user?.name).length, hint: 'asignados' },
          { id: 'citas', label: 'Citas', value: listCitas().filter((c) => c.psicologo === user?.name && (c.estado === 'confirmada' || c.estado === 'pendiente')).length, hint: 'próximas' },
          { id: 'guias', label: 'Guías', value: listGuias().length, hint: 'publicadas' },
          { id: 'estres', label: 'Estrés prom.', value: resumen.estresPromedio ?? '—', hint: 'episodios' },
        ]
      : [
          { id: 'empresas', label: 'Empresas', value: listRegistros('empresas').length, hint: 'registradas' },
          { id: 'psicologos', label: 'Psicólogos', value: listRegistros('psicologos').length, hint: 'activos' },
          { id: 'pacientes', label: 'Pacientes', value: listRegistros('pacientes').length, hint: 'en programa' },
          { id: 'citas', label: 'Citas', value: resumen.citasProximas, hint: 'próximas' },
        ]

  const quickActions: QuickAction[] = esPaciente
    ? [
        { label: 'CAREband', description: 'Signos vitales en vivo', path: '/careband', icon: 'monitor' },
        { label: 'Registrar episodio', description: 'Cómo te sientes ahora', path: '/monitoreo', icon: 'timeline' },
        { label: 'Pausa activa', description: 'Autorregulación guiada', path: '/autorregulacion', icon: 'breath' },
        { label: 'Agendar cita', description: 'Con tu psicólogo', path: '/agenda', icon: 'calendar' },
      ]
    : rol === 'psicologo'
      ? [
          { label: 'Mi panel', description: 'Agenda y pacientes', path: '/mi-panel', icon: 'panel' },
          { label: 'Reportes', description: 'Descargar informes', path: '/reportes', icon: 'report' },
          { label: 'Guías en video', description: 'Publicar para pacientes', path: '/mi-panel', icon: 'video' },
          { label: 'Mi perfil', description: 'Datos y foto', path: '/cuenta', icon: 'person' },
        ]
      : [
          { label: 'Gestión', description: 'Empresas y usuarios', path: '/gestion', icon: 'settings' },
          { label: 'Empresas', description: 'Panel agregado', path: '/empresa', icon: 'business' },
          { label: 'Reportes', description: 'Descargar informes', path: '/reportes', icon: 'report' },
          { label: 'Mi perfil', description: 'Datos y foto', path: '/cuenta', icon: 'person' },
        ]

  // Solo el paciente ve sus episodios; los demás ven la agenda de citas.
  const episodes: Episode[] = esPaciente
    ? listEpisodios().slice(0, 3).map((e) => ({
        id: e.id,
        date: fechaRelativa(e.ts),
        level: e.level,
        mood: e.mood,
        trigger: e.trigger,
      }))
    : []

  const citas = esPaciente
    ? []
    : rol === 'psicologo'
      ? listCitas().filter((c) => c.psicologo === user?.name)
      : listCitas()

  const stressLevel = resumen.ultimoEstres ?? user?.stressLevel ?? 42
  const tip = TIPS[rol] ?? TIPS.default

  return { greeting, esPaciente, rol, stressLevel, stats, quickActions, episodes, citas, tip }
}
