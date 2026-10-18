import { resumenBienestar } from '@src/services/bienestar.service'
import { listCitas } from '@src/services/citas.service'
import { listRegistros } from '@src/services/gestion.service'
import { listGuias } from '@src/services/guias.service'
import type { Role } from '@src/services/auth.service'

// Agente simulado: responde según el rol usando los datos reales del store.

export interface ChatMessage {
  id: string
  de: 'usuario' | 'agente'
  texto: string
  ts: number
}

export type AgenteTipo = 'bienestar' | 'guia' | 'sesion'

export interface AgenteInfo {
  tipo: AgenteTipo
  nombre: string
  subtitulo: string
}

export const agenteParaRol = (rol: Role | undefined): AgenteInfo => {
  switch (rol) {
    case 'paciente':
      return { tipo: 'bienestar', nombre: 'ATEMPO', subtitulo: 'Asistente de bienestar' }
    case 'psicologo':
      return { tipo: 'guia', nombre: 'ATEMPO', subtitulo: 'Guía clínica — datos de pacientes' }
    default:
      return { tipo: 'guia', nombre: 'ATEMPO', subtitulo: 'Guía de datos — empresas y programa' }
  }
}

const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const tiene = (t: string, ...ks: string[]) => ks.some((k) => norm(t).includes(norm(k)))

const proximaCita = () =>
  listCitas().find((c) => c.estado === 'confirmada' || c.estado === 'pendiente')

const responderPaciente = (t: string): string => {
  const r = resumenBienestar()
  if (tiene(t, 'hola', 'buenas', 'hey')) {
    return 'Hola. Estoy aquí contigo — puedo contarte cómo va tu bienestar, tu próxima cita o sugerirte una pausa. ¿Qué necesitas?'
  }
  if (tiene(t, 'estres', 'ansiedad', 'tenso', 'tensa', 'mal', 'agobiado', 'agobiada')) {
    const nivel = r.ultimoEstres
    return nivel != null
      ? `Tu último registro marcó ${nivel} de activación. Si ahora te sientes tenso, una pausa activa de 3 minutos suele bajarlo — la encuentras en Autorregulación. ¿Quieres que te guíe?`
      : 'Aún no tengo registros tuyos. Si te sientes tenso, registra el episodio en Monitoreo y prueba una pausa activa en Autorregulación.'
  }
  if (tiene(t, 'cita', 'psicologo', 'terapeuta', 'sesion')) {
    const cita = proximaCita()
    return cita
      ? `Tu próxima cita es con ${cita.psicologo} (${cita.fecha} · ${cita.hora}). Cuando llegue la hora, "Entrar a cita" abre la videollamada desde el módulo Citas.`
      : 'No tienes citas próximas. Puedes reservar un horario con tu psicólogo desde el módulo Citas.'
  }
  if (tiene(t, 'pausa', 'respirar', 'respiracion', 'calmar', 'relajar')) {
    return 'Te sugiero la respiración 4-7-8: inhala 4s, retén 7s, exhala 8s — tres ciclos. En Autorregulación tienes la PAUSA guiada paso a paso, y tu psicólogo puede dejarte video-guías ahí mismo.'
  }
  if (tiene(t, 'avatar', 'xp', 'nivel', 'insignia')) {
    return `Llevas ${r.xp} XP (nivel ${r.nivel}) y ${r.diasActivos} días activos. Cada pausa, registro y cita completada suma — tu avatar refleja tu constancia.`
  }
  if (tiene(t, 'gracias')) return 'Con gusto. Estoy aquí cuando lo necesites — tu bienestar es primero.'
  return 'Te escucho. Puedo ayudarte con tu nivel de estrés, tus citas, pausas de autorregulación o tu progreso en el avatar. ¿Por dónde empezamos?'
}

const responderGuia = (t: string, rol: Role | undefined): string => {
  const r = resumenBienestar()
  const empresas = listRegistros('empresas')
  const psicologos = listRegistros('psicologos')
  const pacientes = listRegistros('pacientes')
  if (tiene(t, 'hola', 'buenas', 'hey')) {
    return rol === 'psicologo'
      ? 'Hola. Puedo orientarte con los datos de tus pacientes, citas y guías publicadas. ¿Qué revisamos?'
      : 'Hola. Puedo orientarte con empresas, psicólogos, pacientes y reportes del programa. ¿Qué necesitas?'
  }
  if (tiene(t, 'paciente')) {
    const mios = rol === 'psicologo' ? pacientes.filter((p) => p.values.psicologo != null) : pacientes
    const nombres = mios.slice(0, 4).map((p) => p.values.nombre).join(', ')
    return `Hay ${mios.length} paciente(s) en el programa${nombres ? `: ${nombres}${mios.length > 4 ? '…' : ''}` : ''}. El detalle y la nota clínica los ves en Mi Panel → Pacientes.`
  }
  if (tiene(t, 'cita', 'agenda')) {
    return `Hay ${r.citasProximas} cita(s) próximas en la plataforma. Tu disponibilidad la abres en Mi Panel → Mi agenda, arrastrando sobre el calendario.`
  }
  if (tiene(t, 'estres', 'episodio')) {
    return `Se han registrado ${r.totalEpisodios} episodios${r.estresPromedio != null ? ` con un promedio de ${r.estresPromedio} de activación` : ''}. En Reportes puedes descargar la distribución completa.`
  }
  if (tiene(t, 'guia', 'video')) {
    return `Hay ${listGuias().length} guía(s) en video publicadas — aparecen en la Autorregulación de los pacientes. Publica más desde Mi Panel → Guías → Nueva guía.`
  }
  if (tiene(t, 'empresa')) {
    return `Hay ${empresas.length} empresa(s) registrada(s)${empresas.length ? `: ${empresas.map((e) => e.values.nombre).slice(0, 4).join(', ')}` : ''}. Sus métricas agregadas están en el módulo Empresas.`
  }
  if (tiene(t, 'psicologo')) {
    return `Hay ${psicologos.length} psicólogo(s) en el programa. Se administran desde Gestión → Psicólogos.`
  }
  if (tiene(t, 'reporte', 'descarg', 'export')) {
    return 'En Reportes generas PDF/CSV/JSON con lo almacenado: episodios, citas, entidades y un respaldo completo de datos.'
  }
  if (tiene(t, 'gracias')) return 'Con gusto — para eso estoy.'
  return 'Puedo orientarte sobre pacientes, citas, episodios de estrés, guías, empresas y reportes. ¿Qué dato revisamos?'
}

const responderSesion = (): string => {
  const frases = [
    'Entiendo, cuéntame más sobre eso.',
    'Anoté lo que me dices — lo retomamos al final de la sesión.',
    'Gracias por compartirlo. ¿Cómo te hace sentir eso en este momento?',
    'Perfecto, sigamos. Estoy atento a lo que necesites.',
  ]
  return frases[Math.floor(Math.random() * frases.length)]
}

export const responderAgente = (texto: string, tipo: AgenteTipo, rol?: Role): string => {
  if (tipo === 'sesion') return responderSesion()
  if (tipo === 'bienestar') return responderPaciente(texto)
  return responderGuia(texto, rol)
}

export const saludoAgente = (tipo: AgenteTipo, rol?: Role): string => {
  if (tipo === 'sesion') return 'Hola, ya estoy en la sesión. Si necesitas escribirme algo sin interrumpir, aquí estoy.'
  if (tipo === 'bienestar') return 'Hola, soy tu asistente de bienestar. Puedo hablarte de tu estrés, tus citas o sugerirte una pausa. ¿Cómo te sientes hoy?'
  return responderGuia('hola', rol)
}
