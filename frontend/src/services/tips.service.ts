import { STORAGE_KEYS } from '@src/config/api'

// Tips de bienestar y explicaciones de métricas. Los del psicólogo se persisten
// y aparecen rotando en el Inicio del paciente y en los tooltips de métricas.

export type TipContexto = 'inicio' | 'metricas'

export interface Tip {
  id: string
  texto: string
  contexto: TipContexto
  creadoPor: string // 'ATEMPO' para los de sistema, o el nombre del psicólogo
}

export const TIP_CONTEXTOS: { value: TipContexto; label: string }[] = [
  { value: 'inicio', label: 'Tip del día (Inicio)' },
  { value: 'metricas', label: 'Tooltip de métricas' },
]

// Explicación base de cada métrica — se usa como tooltip estable y el pool de
// tips 'metricas' se mezcla encima para variar el contenido.
export const METRICA_EXPLICACIONES: Record<string, string> = {
  fc: 'Latidos por minuto. En reposo, 60–100 bpm es lo habitual; picos sostenidos marcan activación.',
  presion: 'Presión arterial sistólica/diastólica. Cerca de 120/80 mmHg es lo esperado.',
  spo2: 'Saturación de oxígeno en sangre. El rango habitual es 95–100%.',
  temp: 'Temperatura corporal de la banda; se usa como referencia, no diagnóstico.',
  hrv: 'Variabilidad entre latidos. Más alta suele indicar mejor recuperación del sistema nervioso.',
  gsr: 'Respuesta galvánica de la piel — sube con la activación fisiológica del estrés.',
  sueno: 'Tipo de sueño dominante de la última noche. Profundo y REM son los más reparadores.',
  pasos: 'Pasos acumulados hoy. Moverse más de 7.000 al día se asocia a mejor regulación.',
  calorias: 'Gasto calórico estimado del día según la actividad registrada por la banda.',
  estres: 'Nivel de activación 0–100: verde <35, amarillo 35–64, rojo ≥65.',
  xp: 'Puntos de constancia: suman episodios, pausas completadas y citas asistidas.',
  sesiones: 'Pausas activas completadas más citas a las que asististe.',
  racha: 'Días con al menos un registro, pausa o cita en la plataforma.',
  pacientes: 'Pacientes registrados en el programa (asignados a ti si eres psicólogo).',
  citas: 'Citas en estado pendiente o confirmada en la agenda.',
  guias: 'Videos y guías paso a paso publicados — visibles en Autorregulación del paciente.',
  empresas: 'Organizaciones afiliadas al programa de bienestar.',
  psicologos: 'Profesionales activos que atienden pacientes en la plataforma.',
  empleados: 'Nómina total registrada en la empresa seleccionada.',
  activos: 'Porcentaje de empleados que usa la plataforma activamente.',
  participacion: 'Proporción de usuarios que registran actividad cada semana.',
}

const SEED: Tip[] = [
  { id: 't-1', texto: 'Cuando notes tensión, respira 4-7-8: inhala 4s, retén 7s, exhala 8s. Tres ciclos bastan para bajar la activación.', contexto: 'inicio', creadoPor: 'ATEMPO' },
  { id: 't-2', texto: 'Una pausa de 3 minutos cada 90 minutos de trabajo mantiene tu nivel de estrés en verde.', contexto: 'inicio', creadoPor: 'ATEMPO' },
  { id: 't-3', texto: 'Registra el episodio apenas lo notes — el dato temprano le dice a tu psicólogo cuándo acompañarte.', contexto: 'inicio', creadoPor: 'ATEMPO' },
  { id: 't-4', texto: 'La HRV alta no es buena suerte: es tu sistema nervioso recuperándose. Protégela durmiendo bien.', contexto: 'metricas', creadoPor: 'ATEMPO' },
  { id: 't-5', texto: 'SpO₂ por debajo de 94% de forma sostenida amerita comentarlo en tu próxima cita.', contexto: 'metricas', creadoPor: 'ATEMPO' },
  { id: 't-6', texto: 'Dormir menos de 6 horas eleva tu FC en reposo al día siguiente — el sueño también es regulación.', contexto: 'metricas', creadoPor: 'ATEMPO' },
]

const read = (): Tip[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.tips)
    if (raw == null) {
      localStorage.setItem(STORAGE_KEYS.tips, JSON.stringify(SEED))
      return SEED
    }
    return JSON.parse(raw) as Tip[]
  } catch {
    return SEED
  }
}

const write = (tips: Tip[]) => localStorage.setItem(STORAGE_KEYS.tips, JSON.stringify(tips))

export const listTips = (contexto?: TipContexto): Tip[] => {
  const all = read()
  return contexto ? all.filter((t) => t.contexto === contexto) : all
}

export const createTip = (input: Omit<Tip, 'id'>): Tip => {
  const tip: Tip = { ...input, id: `t-${Date.now()}` }
  write([...read(), tip])
  return tip
}

export const updateTip = (id: string, input: Omit<Tip, 'id'>): void => {
  write(read().map((t) => (t.id === id ? { ...input, id } : t)))
}

export const deleteTip = (id: string): void => {
  write(read().filter((t) => t.id !== id))
}
