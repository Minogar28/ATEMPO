import { useState } from 'react'
import { Box, Fab, Paper, Tooltip } from '@mui/material'
import { ChatBubbleRounded, CloseRounded } from '@mui/icons-material'
import { glassStrongSx, riseInSx } from '@src/theme/brand'
import { useAuth } from '@src/states/AuthContext'
import ChatArea from './ChatArea'
import { agenteParaRol } from './helper'

// Burbuja de chat flotante: pacientes hablan con el asistente de bienestar;
// psicólogos/empresas con la guía de datos del programa.
const Chat = () => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const rol = user?.roles[0]
  const agente = agenteParaRol(rol)

  return (
    <Box sx={{ position: 'fixed', bottom: { xs: 84, md: 24 }, right: 20, zIndex: 1100 }}>
      {open && (
        <Paper
          sx={[
            glassStrongSx,
            riseInSx,
            {
              position: 'absolute',
              bottom: 60,
              right: 0,
              width: 330,
              maxWidth: 'calc(100vw - 40px)',
              overflow: 'hidden',
              boxShadow: '0 18px 50px rgba(4,12,28,0.55)',
            },
          ]}
        >
          <ChatArea agente={agente} rol={rol} />
        </Paper>
      )}
      <Tooltip title={open ? 'Cerrar chat' : 'Asistente ATEMPO'} placement="left">
        <Fab
          size="medium"
          onClick={() => setOpen((o) => !o)}
          sx={{
            bgcolor: 'primary.main',
            color: '#0C1F3C',
            boxShadow: '0 8px 24px rgba(226,184,74,0.35)',
            '&:hover': { bgcolor: '#c9a035' },
          }}
        >
          {open ? <CloseRounded /> : <ChatBubbleRounded />}
        </Fab>
      </Tooltip>
    </Box>
  )
}

export default Chat
