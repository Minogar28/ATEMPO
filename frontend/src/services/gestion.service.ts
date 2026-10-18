import { STORAGE_KEYS } from '@src/config/api'

// Registros administrativos (empresas, psicólogos, pacientes) creados en Gestión.
// Mock persistido en localStorage. El hook del módulo usa useLocalStorage con el
// mismo seed para reactividad; estas funciones exponen lectura a otros módulos
// (empresa, reportes, agenda) que necesitan los nombres reales creados.

export type GestionTab = 'empresas' | 'psicologos' | 'pacientes'

export interface GestionRegistro {
  id: number
  values: Record<string, string>
}

export type GestionData = Record<GestionTab, GestionRegistro[]>

export const GESTION_SEED: GestionData = {
  empresas: [
    { id: 1, values: { nombre: 'TechCorp Colombia', nit: '901.234.567-8', empleados: '248', contacto: 'Juliana Mora', telefono: '+57 601 743 2210', email: 'contacto@techcorp.co', plan: 'Premium', estado: 'Activa' } },
    { id: 2, values: { nombre: 'Grupo Nova', nit: '890.112.334-5', empleados: '120', contacto: 'Ricardo Salas', telefono: '+57 604 444 8890', email: 'rrhh@gruponova.co', plan: 'Estándar', estado: 'Activa' } },
    { id: 3, values: { nombre: 'Financiera Andina', nit: '860.555.777-1', empleados: '340', contacto: 'Marcela Ruiz', telefono: '+57 602 555 1020', email: 'bienestar@fandina.co', plan: 'Básico', estado: 'Pendiente' } },
  ],
  psicologos: [
    { id: 1, values: { nombre: 'Dra. Camila Torres', cedula: 'PSI-10234', telefono: '+57 310 456 7890', email: 'ctorres@atempo.co', especialidad: 'Ansiedad y estrés laboral', empresa: 'TechCorp Colombia' } },
    { id: 2, values: { nombre: 'Dr. Andrés Mejía', cedula: 'PSI-20567', telefono: '+57 315 222 3344', email: 'amejia@atempo.co', especialidad: 'TCC', empresa: 'Grupo Nova' } },
    { id: 3, values: { nombre: 'Dra. Laura Gómez', cedula: 'PSI-30981', telefono: '+57 300 987 1122', email: 'lgomez@atempo.co', especialidad: 'Mindfulness clínico', empresa: 'TechCorp Colombia' } },
  ],
  pacientes: [
    { id: 1, values: { nombre: 'Laura Peña', cedula: '1.020.456.789', nacimiento: '1994-03-12', email: 'laura.pena@mail.co', telefono: '+57 301 234 5566', empresa: 'TechCorp Colombia', psicologo: 'Dra. Camila Torres' } },
    { id: 2, values: { nombre: 'Carlos Ruiz', cedula: '1.030.998.112', nacimiento: '1988-07-30', email: 'carlos.ruiz@mail.co', telefono: '+57 302 887 4411', empresa: 'TechCorp Colombia', psicologo: 'Dra. Camila Torres' } },
    { id: 3, values: { nombre: 'Ana Sofía Vega', cedula: '1.045.221.330', nacimiento: '1997-11-05', email: 'ana.vega@mail.co', telefono: '+57 311 555 9090', empresa: 'Grupo Nova', psicologo: 'Dr. Andrés Mejía' } },
  ],
}

export const readGestion = (): GestionData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.gestion)
    if (raw == null) return GESTION_SEED
    return JSON.parse(raw) as GestionData
  } catch {
    return GESTION_SEED
  }
}

export const listRegistros = (tab: GestionTab): GestionRegistro[] => readGestion()[tab] ?? []

export const listNombres = (tab: GestionTab): string[] =>
  listRegistros(tab).map((r) => r.values.nombre).filter(Boolean)
