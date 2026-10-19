export interface Vitals {
  hr: number
  spo2: number
  temp: number
  gsr: number
  hrv: number
}

export interface TrendPoint {
  t: string
  hr: number
}

// Métricas del día (no son flujo en vivo): las provee services/signos.service.ts.
export interface MetricasDia {
  presion: string // "118/76" mmHg
  tipoSueno: string
  horasSueno: number
  caloriasDia: number
  pasosDia: number
}
