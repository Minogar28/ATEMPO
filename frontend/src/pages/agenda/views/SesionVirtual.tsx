import { useEffect, useState } from 'react'
import { Avatar, Box, Button, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import {
  ChatBubbleRounded,
  MicOffRounded,
  MicRounded,
  SettingsRounded,
  VideocamOffRounded,
  VideocamRounded,
} from '@mui/icons-material'
import { glassStrongSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { useAuth } from '@src/states/AuthContext'
import { PageHeader } from '@src/components'
import ChatArea from '@src/components/Chat/ChatArea'
import type { Cita } from '../types'

// Iniciales del nombre omitiendo el prefijo profesional ("Dra.", "Dr.").
const iniciales = (nombre: string): string =>
  nombre
    .replace(/^Dr?a?\.\s*/i, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const controlSx = {
  width: 42,
  height: 42,
  borderRadius: 3.5,
  bgcolor: alpha('#ffffff', 0.06),
  border: '1px solid rgba(255,255,255,0.1)',
  '&:hover': { bgcolor: alpha('#ffffff', 0.1) },
}

// Sesión de videollamada simulada: replica la sala del prototipo (video del
// psicólogo, mini-video del paciente, controles y temporizador). El código de
// sala corresponde al meetUrl "generado" al crear la cita — cuando exista la
// integración real, esta vista embebe el Meet o enlaza a la API de Google.
const SesionVirtual = ({ cita, onFinalizar }: { cita: Cita; onFinalizar: () => void }) => {
  const { user } = useAuth()
  const [segundos, setSegundos] = useState(0)
  const [mic, setMic] = useState(true)
  const [cam, setCam] = useState(true)
  const [chatAbierto, setChatAbierto] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const mm = String(Math.floor(segundos / 60)).padStart(2, '0')
  const ss = String(segundos % 60).padStart(2, '0')
  const sala = cita.meetUrl?.split('/').pop() ?? 'sala-simulada'

  return (
    <Stack spacing={2}>
      <PageHeader title="Sesión en curso" subtitle={`${cita.psicologo} · Videollamada segura`} />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: 'stretch' }}>
      <Paper sx={{ overflow: 'hidden', p: 0, flex: 1, minWidth: 0 }}>
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9', bgcolor: '#111827', display: 'grid', placeItems: 'center' }}>
          {/* Video del psicólogo (simulado) */}
          <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box sx={[glassStrongSx, { borderRadius: '32px', p: 1.5 }]}>
              <Avatar sx={{ width: 96, height: 96, borderRadius: '24px', fontSize: '2rem', fontFamily: displayFont }}>
                {iniciales(cita.psicologo)}
              </Avatar>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>{cita.psicologo}</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
              <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem', color: '#4ade80' }}>
                En sesión · {mm}:{ss}
              </Typography>
            </Stack>
          </Stack>

          {/* Mini-video del paciente */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 14,
              right: 14,
              width: 76,
              height: 96,
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.15)',
              overflow: 'hidden',
              display: 'grid',
              placeItems: 'center',
              ...glassStrongSx,
            }}
          >
            {cam
              ? <Avatar sx={{ width: 52, height: 52, borderRadius: 3, fontSize: '1.1rem' }}>{iniciales(user?.name ?? 'P')}</Avatar>
              : <VideocamOffRounded sx={{ fontSize: 22, color: 'text.disabled' }} />}
          </Box>

          {/* Código de sala */}
          <Box sx={{ position: 'absolute', top: 12, left: 14, px: 1.5, py: 0.5, borderRadius: 2, bgcolor: alpha('#0C1F3C', 0.6) }}>
            <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.secondary' }}>
              meet.google.com/{sala}
            </Typography>
          </Box>
        </Box>

        {/* Controles */}
        <Stack direction="row" spacing={1.5} sx={{ p: 2, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Tooltip title={mic ? 'Silenciar' : 'Activar micrófono'}>
            <IconButton onClick={() => setMic((m) => !m)} sx={controlSx}>
              {mic ? <MicRounded sx={{ fontSize: 18 }} /> : <MicOffRounded sx={{ fontSize: 18, color: '#f87171' }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title={cam ? 'Apagar cámara' : 'Encender cámara'}>
            <IconButton onClick={() => setCam((c) => !c)} sx={controlSx}>
              {cam ? <VideocamRounded sx={{ fontSize: 18 }} /> : <VideocamOffRounded sx={{ fontSize: 18, color: '#f87171' }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title={chatAbierto ? 'Cerrar chat' : 'Chat'}>
            <IconButton
              onClick={() => setChatAbierto((c) => !c)}
              sx={[controlSx, chatAbierto && { bgcolor: alpha('#E2B84A', 0.18), borderColor: 'rgba(226,184,74,0.4)', color: 'primary.main' }]}
            >
              <ChatBubbleRounded sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ajustes">
            <IconButton sx={controlSx}><SettingsRounded sx={{ fontSize: 18 }} /></IconButton>
          </Tooltip>
          <Button
            onClick={onFinalizar}
            sx={{
              ml: 1,
              px: 2.5,
              py: 0.9,
              borderRadius: 3,
              bgcolor: '#f87171',
              color: '#fff',
              fontSize: '0.78rem',
              fontWeight: 600,
              '&:hover': { bgcolor: '#ef4444' },
            }}
          >
            Finalizar sesión
          </Button>
        </Stack>
      </Paper>

      {/* Chat de la sesión — el mismo módulo que la burbuja flotante */}
      {chatAbierto && (
        <Paper sx={{ p: 0, overflow: 'hidden', width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
          <ChatArea
            agente={{ tipo: 'sesion', nombre: cita.psicologo, subtitulo: 'Chat de la sesión' }}
            sx={{ height: { xs: 300, md: '100%' } }}
          />
        </Paper>
      )}
      </Stack>
    </Stack>
  )
}

export default SesionVirtual
