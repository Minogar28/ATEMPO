export type Clima = 'storm' | 'cloud' | 'sun'

export interface NivelClima {
  id: Clima
  label: string
  rango: string
  actual?: boolean
}

export interface Badge {
  id: number
  nombre: string
  descripcion: string
  obtenido: boolean
}

export interface Activity {
  id: number
  texto: string
  fecha: string
}
