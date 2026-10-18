import { STORAGE_KEYS } from '@src/config/api'

// Citas entre paciente y psicólogo (Agenda). Mock persistido en localStorage;
// `meetUrl` simula el enlace de Google Meet que el backend generará vía API.

export type EstadoCita = 'confirmada' | 'pendiente' | 'completada' | 'cancelada'

export interface Cita {
  id: number
  ts: number // timestamp de creación (ordena la actividad del avatar)
  psicologoId: number
  psicologo: string
  fecha: string
  hora: string
  modalidad: 'virtual' | 'presencial'
  estado: EstadoCita
  meetUrl?: string
}

export interface NuevaCita {
  psicologoId: number
  psicologo: string
  fecha: string
  hora: string
  modalidad: 'virtual' | 'presencial'
}

// Simula el código aleatorio de una sala de Meet (formato xxx-xxxx-xxx).
const meetCode = (): string => {
  const rand = (n: number) =>
    Array.from({ length: n }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')
  return `https://meet.google.com/${rand(3)}-${rand(4)}-${rand(3)}`
}

const SEED: Cita[] = [
  {
    id: 1,
    ts: Date.now() - 86400000 * 2,
    psicologoId: 1,
    psicologo: 'Dra. Camila Torres',
    fecha: 'Jue 20',
    hora: '10:30',
    modalidad: 'virtual',
    estado: 'confirmada',
    meetUrl: 'https://meet.google.com/xyz-abcd-efg',
  },
  {
    id: 2,
    ts: Date.now() - 86400000,
    psicologoId: 2,
    psicologo: 'Dr. Andrés Mejía',
    fecha: 'Mar 25',
    hora: '08:00',
    modalidad: 'virtual',
    estado: 'pendiente',
  },
]

const read = (): Cita[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.citas)
    if (raw == null) return SEED
    return JSON.parse(raw) as Cita[]
  } catch {
    return SEED
  }
}

const write = (citas: Cita[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.citas, JSON.stringify(citas))
  } catch {
    // localStorage lleno o bloqueado
  }
}

export const listCitas = (): Cita[] =>
  [...read()].sort((a, b) => b.ts - a.ts)

// Crea la cita y "genera" su sala de Meet, como haría el backend con la API de Google.
export const createCita = (input: NuevaCita): Cita => {
  const cita: Cita = {
    ...input,
    id: Date.now(),
    ts: Date.now(),
    estado: 'confirmada',
    meetUrl: input.modalidad === 'virtual' ? meetCode() : undefined,
  }
  write([cita, ...read()])
  return cita
}

export const updateEstadoCita = (id: number, estado: EstadoCita): void => {
  write(read().map((c) => (c.id === id ? { ...c, estado } : c)))
}

export const completarCita = (id: number): void => updateEstadoCita(id, 'completada')
export const cancelarCita = (id: number): void => updateEstadoCita(id, 'cancelada')
