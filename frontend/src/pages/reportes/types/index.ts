export interface ReportType {
  id: string
  nombre: string
  descripcion: string
  formato: 'PDF' | 'Excel' | 'Ambos' | 'JSON'
}

export interface PreviewPoint {
  periodo: string
  estres: number
  episodios: number
}
