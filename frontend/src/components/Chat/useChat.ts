import { useRef, useState } from 'react'
import { responderAgente, saludoAgente } from './helper'
import type { AgenteTipo, ChatMessage } from './helper'
import type { Role } from '@src/services/auth.service'

// Estado de una conversación simulada: el agente responde tras ~1s de
// "escribiendo…" usando los datos del store (helper.responderAgente).
export const useChat = (tipo: AgenteTipo, rol?: Role) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: 'm-0', de: 'agente', texto: saludoAgente(tipo, rol), ts: 0 },
  ])
  const [typing, setTyping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enviar = (texto: string) => {
    const limpio = texto.trim()
    if (!limpio || typing) return
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, de: 'usuario', texto: limpio, ts: Date.now() }])
    setTyping(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, de: 'agente', texto: responderAgente(limpio, tipo, rol), ts: Date.now() },
      ])
      setTyping(false)
    }, 900 + Math.random() * 700)
  }

  return { messages, typing, enviar }
}
