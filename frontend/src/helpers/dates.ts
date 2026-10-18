// Etiquetas de fecha relativas para registros locales ("Hoy · 14:20", "Ayer · …").

const startOfDay = (d: Date) => {
  const c = new Date(d)
  c.setHours(0, 0, 0, 0)
  return c
}

export const fechaRelativa = (ts: number): string => {
  const d = new Date(ts)
  const hoy = startOfDay(new Date())
  const dia = startOfDay(d)
  const hora = d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })

  if (dia.getTime() === hoy.getTime()) return `Hoy · ${hora}`
  const ayer = startOfDay(new Date(hoy.getTime() - 86400000))
  if (dia.getTime() === ayer.getTime()) return `Ayer · ${hora}`
  const fecha = d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
  return `${fecha} · ${hora}`
}

export const fechaCorta = (ts: number): string =>
  new Date(ts).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })

export const diaKey = (ts: number): string => startOfDay(new Date(ts)).toISOString().slice(0, 10)

// Timestamp de hoy a una hora fija (para seeds de demo).
export const hoyHora = (hora: number, minuto = 0): number => {
  const d = new Date()
  d.setHours(hora, minuto, 0, 0)
  return d.getTime()
}

export const haceDias = (dias: number, hora = 12, minuto = 0): number => {
  const d = new Date()
  d.setDate(d.getDate() - dias)
  d.setHours(hora, minuto, 0, 0)
  return d.getTime()
}
