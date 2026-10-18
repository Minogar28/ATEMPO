import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { youtubeEmbed } from '@src/services/guias.service'
import type { VideoGuia } from '@src/services/guias.service'
import { displayFont } from '@src/theme/typography'

interface Props {
  guia: VideoGuia | null
  onClose: () => void
}

// Reproductor embebido compartido: paciente (autorregulación) y psicólogo
// (vista previa en mi-panel) ven la misma experiencia.
const VideoPlayerDialog = ({ guia, onClose }: Props) => (
  <Dialog open={guia != null} onClose={onClose} maxWidth="md" fullWidth>
    {guia && (
      <>
        <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <Typography sx={{ fontFamily: displayFont, fontSize: '1.15rem', lineHeight: 1.25 }}>
              {guia.titulo}
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5 }}>
              {guia.categoria} · {guia.duracion} · {guia.creadoPor}
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose} aria-label="Cerrar">
            <CloseRounded fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ aspectRatio: '16/9', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Box
              component="iframe"
              src={youtubeEmbed(guia.videoId)}
              title={guia.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{ width: '100%', height: '100%', border: 0, display: 'block' }}
            />
          </Box>
          {guia.descripcion && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
              {guia.descripcion}
            </Typography>
          )}
        </DialogContent>
      </>
    )}
  </Dialog>
)

export default VideoPlayerDialog
