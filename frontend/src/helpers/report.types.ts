export interface ReportTableData {
  columns: string[]
  rows: string[][]
}

export interface ReportSlide {
  title: string
  subtitle?: string
  bullets?: string[]
  table?: ReportTableData
}

export interface ReportDefinition {
  title: string
  fileName: string
  slides: ReportSlide[]
}
