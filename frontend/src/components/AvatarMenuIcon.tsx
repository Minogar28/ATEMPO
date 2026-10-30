import { useSyncExternalStore } from 'react'
import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import miniFeliz from '@src/assets/images/avatar/mini-feliz.png'
import miniSad from '@src/assets/images/avatar/mini-sad.png'
import miniSerio from '@src/assets/images/avatar/mini-serio.png'
import { climaDeEstres } from '@src/services/bienestar.service'
import { getUltimoEstres, subscribeEpisodios } from '@src/services/episodios.service'

const CLIMA_MINI = { sun: miniFeliz, cloud: miniSerio, storm: miniSad }

// Icono del módulo Avatar: miniatura fija del estado actual. Los GIF no se usan
// aquí porque el menú se monta en todas las páginas.
const AvatarMenuIcon = ({ sx }: { sx?: SxProps<Theme> }) => {
  const estres = useSyncExternalStore(subscribeEpisodios, getUltimoEstres)

  return (
    <Box
      component="img"
      src={CLIMA_MINI[climaDeEstres(estres)]}
      alt=""
      sx={[
        // Margen negativo: ocupa 22 px sin desalinear las etiquetas del menú.
        { width: 22, height: 22, m: '-2.5px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 0 1px currentColor' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}

export default AvatarMenuIcon
