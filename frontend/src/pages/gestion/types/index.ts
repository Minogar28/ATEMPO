export interface Entidad {
  id: number
  nombre: string
  detalle: string
  extra?: string
}

export type GestionTab = 'empresas' | 'psicologos' | 'pacientes'

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select'

export interface FieldDef {
  name: string
  label: string
  type: FieldType
  required?: boolean
  options?: string[]
  half?: boolean // ocupa media fila en el grid del formulario
}

export type FormValues = Record<string, string>

// El registro persistido (todos los valores del formulario) lo define
// services/gestion.service.ts como GestionRegistro — así el store es único
// y otros módulos lo leen sin importar tipos de página.
