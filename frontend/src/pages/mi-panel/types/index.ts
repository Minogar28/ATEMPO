export interface PacienteAsignado {
  id: number
  nombre: string
  empresa: string
  estres: number
  ultimaCita: string
  nota?: string
}

export interface CitaDia {
  id: number
  paciente: string
  hora: string
  estado: 'confirmada' | 'pendiente' | 'completada' | 'cancelada'
  estresPaciente: number
}
