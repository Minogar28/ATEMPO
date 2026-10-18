export interface EmpresaKpi {
  id: string
  label: string
  value: string | number
  delta?: string
  color: string
}

export interface TendenciaPoint {
  mes: string
  estres: number
  participacion: number
}

export interface AreaData {
  area: string
  estres: number
}

export interface PsicologoKpi {
  id: number
  nombre: string
  pacientes: number
  citas: number
  estresProm: number
}
