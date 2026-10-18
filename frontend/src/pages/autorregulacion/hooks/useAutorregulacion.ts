import { useCallback, useEffect, useRef, useState } from 'react'
import { swalFire } from '@src/helpers/alert'
import { listGuias, listGuiasBib } from '@src/services/guias.service'
import { createPausa } from '@src/services/pausas.service'
import type { GuiaBiblioteca, VideoGuia } from '@src/services/guias.service'
import type { PausaStep } from '../types'

const STEPS: PausaStep[] = ['medir', 'respirar', 'relajar', 'emocion', 'medir2', 'resultado']

// Flujo PAUSA del prototipo: medir → respirar → relajar → emoción → medir → comparar.
export const useAutorregulacion = () => {
  const [step, setStep] = useState<PausaStep>('idle')
  const [antes, setAntes] = useState(50)
  const [despues, setDespues] = useState(30)
  const [emocion, setEmocion] = useState('')
  const [breathPhase, setBreathPhase] = useState(0) // 0 inhala, 1 retén, 2 exhala
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  useEffect(() => {
    if (step === 'respirar') {
      intervalRef.current = setInterval(() => setBreathPhase((p) => (p + 1) % 3), 4000)
    } else if (step === 'relajar') {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) { clearTimer(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return clearTimer
  }, [step])

  const start = (guia?: GuiaBiblioteca | null) => {
    if (guia) setGuiaActiva(guia)
    setStep('medir')
    setBreathPhase(0)
  }
  const next = useCallback(() => {
    const idx = STEPS.indexOf(step)
    if (idx < 0 || idx >= STEPS.length - 1) return
    const siguiente = STEPS[idx + 1]
    if (siguiente === 'relajar') setTimer(60)
    setStep(siguiente)
  }, [step])
  const finish = () => {
    // La pausa completada persiste y alimenta el estado/XP del avatar.
    createPausa({ antes, despues, emocion: emocion || 'Sin registrar' })
    setStep('idle')
    setGuiaActiva(null)
    void swalFire({ icon: 'success', title: 'Pausa guardada', text: 'Tu avatar registra esta actividad.', timer: 1600, showConfirmButton: false })
  }

  // Guías en video y guías paso a paso publicadas por el psicólogo.
  const [videoGuias] = useState<VideoGuia[]>(listGuias)
  const [playing, setPlaying] = useState<VideoGuia | null>(null)
  const [guiasBib] = useState<GuiaBiblioteca[]>(listGuiasBib)
  // Guía seleccionada de la biblioteca: su contenido se muestra en la zona PAUSA.
  const [guiaActiva, setGuiaActiva] = useState<GuiaBiblioteca | null>(null)

  return {
    step, start, next, finish,
    antes, setAntes,
    despues, setDespues,
    emocion, setEmocion,
    breathPhase, timer,
    guiasBib, guiaActiva, setGuiaActiva,
    videoGuias, playing, setPlaying,
  }
}
