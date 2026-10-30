import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import logo from '@src/assets/images/logos/app.png'
import { APP_NAME } from '@src/config/api'

interface AppLogoProps {
  size: number
  sx?: SxProps<Theme>
}

// Logo de la app sobre su fondo crema, en una tarjeta cuadrada redondeada.
const AppLogo = ({ size, sx }: AppLogoProps) => (
  <Box
    component="img"
    src={logo}
    alt={APP_NAME}
    sx={[
      {
        display: 'block',
        width: size,
        height: size,
        flexShrink: 0,
        objectFit: 'contain',
        background: '#FCF5EB',
        borderRadius: `${Math.round(size * 0.28)}px`,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  />
)

export default AppLogo
