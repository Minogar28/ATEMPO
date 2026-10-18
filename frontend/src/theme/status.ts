// Colores semáforo de estrés y acentos de datos del prototipo.
// Extienden la paleta via module augmentation (src/types/mui.d.ts).
export const statusColors = {
  ok: '#4ade80',
  warning: '#E2B84A',
  critical: '#f87171',
  neutral: '#7a8494',
  info: '#60a5fa',
  accent: '#c084fc',
}

// Umbrales semafóricos compartidos por todos los módulos.
export const stressColor = (level: number): string =>
  level < 35 ? statusColors.ok : level < 65 ? statusColors.warning : statusColors.critical
