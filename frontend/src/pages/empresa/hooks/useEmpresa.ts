import { useState } from 'react'
import { listNombres } from '@src/services/gestion.service'
import { promediosSignos } from '@src/services/signos.service'
import type { AreaData, EmpresaKpi, PsicologoKpi, TendenciaPoint } from '../types'

// Las empresas del selector salen del mismo store que administra Gestión.

const kpis: EmpresaKpi[] = [
  { id: 'empleados', label: 'Empleados', value: 248, delta: '+12', color: '#60a5fa' },
  { id: 'activos', label: 'Activos en programa', value: '74%', delta: '+6%', color: '#4ade80' },
  { id: 'estres', label: 'Estrés promedio', value: 47, delta: '-5', color: '#E2B84A' },
  { id: 'participacion', label: 'Participación', value: '81%', delta: '+3%', color: '#c084fc' },
]

const tendencia: TendenciaPoint[] = [
  { mes: 'Oct', estres: 58, participacion: 62 },
  { mes: 'Nov', estres: 54, participacion: 68 },
  { mes: 'Dic', estres: 61, participacion: 55 },
  { mes: 'Ene', estres: 52, participacion: 71 },
  { mes: 'Feb', estres: 49, participacion: 76 },
  { mes: 'Mar', estres: 47, participacion: 81 },
]

const areas: AreaData[] = [
  { area: 'Operaciones', estres: 61 },
  { area: 'Ventas', estres: 55 },
  { area: 'Tecnología', estres: 48 },
  { area: 'RRHH', estres: 39 },
  { area: 'Finanzas', estres: 44 },
]

const psicologos: PsicologoKpi[] = [
  { id: 1, nombre: 'Dra. Camila Torres', pacientes: 24, citas: 38, estresProm: 51 },
  { id: 2, nombre: 'Dr. Andrés Mejía', pacientes: 19, citas: 31, estresProm: 45 },
  { id: 3, nombre: 'Dra. Laura Gómez', pacientes: 16, citas: 24, estresProm: 42 },
]

export const useEmpresa = () => {
  const empresas = ['Todas las empresas', ...listNombres('empresas')]
  const [empresa, setEmpresa] = useState('Todas las empresas')
  const [tab, setTab] = useState('tendencia')
  // Promedios biométricos del programa — agregados y sin identificación.
  const prom = promediosSignos()
  const kpisCompletos: EmpresaKpi[] = [
    ...kpis,
    ...(prom
      ? [
          { id: 'fc', label: 'FC promedio', value: `${prom.frecuenciaCardiaca} bpm`, color: '#f87171' },
          { id: 'sueno', label: 'Sueño prom.', value: `${prom.horasSueno} h`, color: '#60a5fa' },
          { id: 'spo2', label: 'SpO₂ prom.', value: `${prom.oxigenoSangre}%`, color: '#4ade80' },
          { id: 'pasos', label: 'Pasos prom.', value: prom.pasosDia.toLocaleString('es'), color: '#f0d070' },
        ]
      : []),
  ]
  return { empresa, setEmpresa, empresas, tab, setTab, kpis: kpisCompletos, tendencia, areas, psicologos }
}
