import { useEffect, useMemo, useState } from 'react'
import { swalFire } from '@src/helpers/alert'
import { useAuth } from '@src/states/AuthContext'
import { diaKey, fechaRelativa } from '@src/helpers/dates'
import { resumenBienestar } from '@src/services/bienestar.service'
import { listCitas } from '@src/services/citas.service'
import { createEpisodio, listEpisodios } from '@src/services/episodios.service'
import { listGuias } from '@src/services/guias.service'
import { listRegistros } from '@src/services/gestion.service'
import { listTips, METRICA_EXPLICACIONES } from '@src/services/tips.service'
import type { Episode, HomeStat, QuickAction } from '../types'

// Check-in de 1 toque: mood → nivel de estrés que alimenta el semáforo.
export const CHECKIN_MOODS = [
  { mood: 'Calmado', level: 20 },
  { mood: 'Neutral', level: 42 },
  { mood: 'Tenso', level: 58 },
  { mood: 'Ansioso', level: 78 },
] as const

const greetingByHour = (hour: number): string => {
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

const TIPS: Record<string, string> = {
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

  const [resumen, setResumen] = useState(resumenBienestar)
  const [episodios, setEpisodios] = useState(listEpisodios)

  // Check-in rápido: un toque registra el episodio y refresca semáforo, XP y
  // actividad sin pasar por el formulario completo de Monitoreo.
  const checkIn = (mood: string, level: number) => {
    createEpisodio({ level, mood, trigger: 'Check-in' })
    setEpisodios(listEpisodios())
    setResumen(resumenBienestar())
    void swalFire({ icon: 'success', title: 'Check-in registrado', text: `Hoy te sientes ${mood.toLowerCase()}.`, timer: 1400, showConfirmButton: false })
  }

  const [hoy] = useState(() => diaKey(Date.now()))
  const checkInHoy = episodios.find((e) => e.trigger === 'Check-in' && diaKey(e.ts) === hoy)

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
    ? episodios.slice(0, 3).map((e) => ({
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

  // Tip del día: rota entre los tips del sistema y los que publica el
  // psicólogo en Mi Panel → Tips (contexto 'inicio'). Cambia cada 8s.
  const tipsInicio = useMemo(() => {
    const pool = listTips('inicio').map((t) => t.texto)
    const extra = TIPS[rol] ?? TIPS.default
    return rol === 'paciente' ? pool : [extra, ...pool]
  }, [rol])
  const [tipIdx, setTipIdx] = useState(0)
  useEffect(() => {
    if (tipsInicio.length < 2) return
    const id = setInterval(() => setTipIdx((i) => (i + 1) % tipsInicio.length), 8000)
    return () => clearInterval(id)
  }, [tipsInicio.length])
  const tip = tipsInicio[tipIdx % tipsInicio.length]

  // Tooltip fijo por KPI: explicación de qué mide cada tile.
  const statTooltip = (id: string): string | undefined => METRICA_EXPLICACIONES[id]

  return { greeting, esPaciente, rol, stressLevel, stats, quickActions, episodes, citas, tip, checkIn, checkInHoy, statTooltip }
}
