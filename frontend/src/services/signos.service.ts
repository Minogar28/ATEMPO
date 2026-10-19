import { STORAGE_KEYS } from '@src/config/api'
import { listRegistros } from './gestion.service'

// Métricas diarias estructuradas por paciente (CAREband + autoreporte):
// frecuencia cardíaca, presión arterial, sueño, SpO₂, calorías y pasos.
// Persisten en localStorage hasta que exista el backend/BLE real.

export type TipoSueno = 'Profundo' | 'Ligero' | 'REM' | 'Fragmentado'

export interface SignosDia {
  fecha: string // YYYY-MM-DD
  frecuenciaCardiaca: number // bpm en reposo
  presionSistolica: number // mmHg
  presionDiastolica: number // mmHg
  tipoSueno: TipoSueno
  horasSueno: number
  oxigenoSangre: number // SpO₂ %
  caloriasDia: number // kcal
  pasosDia: number
}

export interface SignosPaciente {
  pacienteId: string // id del registro de Gestión, o 'propio' = el paciente en sesión
  paciente: string
  empresa?: string
  dias: SignosDia[] // ordenados asc por fecha; el último es el día más reciente
}

export const PACIENTE_PROPIO = 'propio'

const TIPOS_SUENO: TipoSueno[] = ['Profundo', 'Ligero', 'REM', 'Fragmentado']

// Semilla determinística por paciente/día para que los mocks sean estables
// entre sesiones (misma entrada → mismos valores).
const jitter = (seed: number, base: number, range: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return Math.round((base + (x - Math.floor(x) - 0.5) * range) * 10) / 10
}

const diaSignos = (seed: number, fecha: string): SignosDia => ({
  fecha,
  frecuenciaCardiaca: Math.round(jitter(seed + 1, 72, 14)),
  presionSistolica: Math.round(jitter(seed + 2, 118, 16)),
  presionDiastolica: Math.round(jitter(seed + 3, 76, 10)),
  tipoSueno: TIPOS_SUENO[Math.abs(Math.round(jitter(seed + 4, 1.4, 3))) % TIPOS_SUENO.length],
  horasSueno: jitter(seed + 5, 6.8, 2.4),
  oxigenoSangre: Math.round(jitter(seed + 6, 97, 3)),
  caloriasDia: Math.round(jitter(seed + 7, 2100, 700)),
  pasosDia: Math.round(jitter(seed + 8, 7400, 6200)),
})

const seedSignos = (): SignosPaciente[] => {
  const hoy = new Date()
  const dias = (pacienteSeed: number): SignosDia[] =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(hoy)
      d.setDate(d.getDate() - (6 - i))
      return diaSignos(pacienteSeed + i * 10, d.toISOString().slice(0, 10))
    })

  const dePacientes = listRegistros('pacientes').map((p) => ({
    pacienteId: String(p.id),
    paciente: p.values.nombre ?? 'Paciente',
    empresa: p.values.empresa,
    dias: dias(p.id * 100),
  }))

  return [
    { pacienteId: PACIENTE_PROPIO, paciente: 'Tú', dias: dias(900) },
    ...dePacientes,
  ]
}

const read = (): SignosPaciente[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.signos)
    if (raw == null) {
      const seed = seedSignos()
      localStorage.setItem(STORAGE_KEYS.signos, JSON.stringify(seed))
      return seed
    }
    return JSON.parse(raw) as SignosPaciente[]
  } catch {
    return seedSignos()
  }
}

export const listSignos = (): SignosPaciente[] => read()

export const signosDe = (pacienteId: string): SignosDia | undefined =>
  read().find((s) => s.pacienteId === pacienteId)?.dias.at(-1)

export const historialDe = (pacienteId: string): SignosDia[] =>
  read().find((s) => s.pacienteId === pacienteId)?.dias ?? []

export const signosPropios = (): SignosDia | undefined => signosDe(PACIENTE_PROPIO)

// Agregados anonimizados para el panel de empresa y reportes ejecutivos:
// promedios del día más reciente, sin identificar pacientes.
export const promediosSignos = () => {
  const todos = read().filter((s) => s.pacienteId !== PACIENTE_PROPIO)
  const ultimos = todos.map((s) => s.dias.at(-1)).filter((d): d is SignosDia => d != null)
  if (ultimos.length === 0) return null
  const avg = (f: (d: SignosDia) => number) =>
    Math.round((ultimos.reduce((a, d) => a + f(d), 0) / ultimos.length) * 10) / 10
  return {
    n: ultimos.length,
    frecuenciaCardiaca: avg((d) => d.frecuenciaCardiaca),
    presion: `${Math.round(avg((d) => d.presionSistolica))}/${Math.round(avg((d) => d.presionDiastolica))}`,
    horasSueno: avg((d) => d.horasSueno),
    oxigenoSangre: avg((d) => d.oxigenoSangre),
    caloriasDia: Math.round(avg((d) => d.caloriasDia)),
    pasosDia: Math.round(avg((d) => d.pasosDia)),
  }
}
