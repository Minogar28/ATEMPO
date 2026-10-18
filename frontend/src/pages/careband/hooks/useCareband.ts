import { useEffect, useState } from 'react'
import type { TrendPoint, Vitals } from '../types'

const jitter = (base: number, range: number) =>
  Math.round((base + (Math.random() - 0.5) * range) * 10) / 10

const seedTrend = (): TrendPoint[] =>
  Array.from({ length: 24 }, (_, i) => ({ t: `-${24 - i}m`, hr: jitter(72, 8) }))

// Simula la lectura en vivo del wearable; reemplazar por services/careband.service.ts (BLE/API).
export const useCareband = () => {
  const [connected, setConnected] = useState(true)
  const [vitals, setVitals] = useState<Vitals>({ hr: 72, spo2: 98, temp: 36.4, gsr: 2.1, hrv: 58 })
  const [trend, setTrend] = useState<TrendPoint[]>(seedTrend)

  useEffect(() => {
    if (!connected) return
    const id = setInterval(() => {
      const v: Vitals = {
        hr: jitter(72, 8),
        spo2: jitter(98, 1),
        temp: jitter(36.4, 0.3),
        gsr: jitter(2.1, 0.6),
        hrv: jitter(58, 10),
      }
      setVitals(v)
      setTrend((prev) => [
        ...prev.slice(-23),
        { t: new Date().toLocaleTimeString('es', { minute: '2-digit', second: '2-digit' }), hr: v.hr },
      ])
    }, 2500)
    return () => clearInterval(id)
  }, [connected])

  return { connected, toggleConnected: () => setConnected((c) => !c), vitals, trend }
}
