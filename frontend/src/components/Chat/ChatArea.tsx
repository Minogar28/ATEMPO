import { useEffect, useRef, useState } from 'react'
import { Avatar, Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import { SendRounded } from '@mui/icons-material'
import { glassStrongSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { useChat } from './useChat'
import type { AgenteInfo } from './helper'
import type { Role } from '@src/services/auth.service'

// Panel de conversación reutilizable: lo monta la burbuja flotante de la app
// y la videollamada (modo 'sesion' = el interlocutor es el psicólogo).
// `chat` permite inyectar el estado desde fuera (p. ej. para contar no leídos).
const ChatArea = ({ agente, rol, chat, sx }: { agente: AgenteInfo; rol?: Role; chat?: ReturnType<typeof useChat>; sx?: SxProps<Theme> }) => {
  const interno = useChat(agente.tipo, rol)
  const { messages, typing, enviar } = chat ?? interno
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const submit = () => {
    enviar(input)
    setInput('')
  }

  return (
    <Stack sx={[{ height: 380, minHeight: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {/* Cabecera del agente */}
      <Stack direction="row" spacing={1.25} sx={{ p: 1.5, alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', color: '#0C1F3C', fontFamily: displayFont, fontSize: '0.95rem' }}>
          A
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{agente.nombre}</Typography>
          <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary' }}>{agente.subtitulo}</Typography>
        </Box>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
          <Typography sx={{ fontFamily: monoFont, fontSize: '0.58rem', color: 'text.disabled' }}>en línea</Typography>
        </Stack>
      </Stack>

      {/* Mensajes */}
      <Stack spacing={1.25} className="scroll-area" sx={{ flex: 1, overflowY: 'auto', p: 1.5 }}>
        {messages.map((m) => (
          <Box
            key={m.id}
            sx={{
              alignSelf: m.de === 'usuario' ? 'flex-end' : 'flex-start',
              maxWidth: '82%',
              px: 1.5,
              py: 1,
              borderRadius: 3,
              borderTopRightRadius: m.de === 'usuario' ? 4 : undefined,
              borderTopLeftRadius: m.de === 'agente' ? 4 : undefined,
              ...(m.de === 'usuario'
                ? { bgcolor: 'primary.main', color: '#0C1F3C' }
                : { ...glassStrongSx }),
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.45 }}>{m.texto}</Typography>
          </Box>
        ))}
        {typing && (
          <Stack direction="row" spacing={0.5} sx={{ alignSelf: 'flex-start', px: 1.5, py: 1, ...glassStrongSx, borderRadius: 3, borderTopLeftRadius: 4 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: alpha('#E2B84A', 0.8),
                  animation: 'pulseRing 1.2s ease-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </Stack>
        )}
        <div ref={endRef} />
      </Stack>

      {/* Entrada */}
      <Box sx={{ p: 1.25, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Escribe un mensaje…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={submit} disabled={!input.trim()} sx={{ color: 'primary.main' }}>
                    <SendRounded sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              fontSize: '0.82rem',
              bgcolor: alpha('#ffffff', 0.04),
            },
          }}
        />
      </Box>
    </Stack>
  )
}

export default ChatArea
