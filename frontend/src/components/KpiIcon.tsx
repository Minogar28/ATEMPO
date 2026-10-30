import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import type { SvgIconComponent } from '@mui/icons-material'
import { brandTokens } from '@src/theme/brand'

interface KpiIconProps {
  icon: SvgIconComponent
  color?: string
  sx?: SxProps<Theme>
}

// Mosaico de icono para KPIs y accesos: fondo tenue del mismo color del icono.
const KpiIcon = ({ icon: Icon, color = brandTokens.mustard, sx }: KpiIconProps) => (
  <Box
    sx={[
      {
        width: 30,
        height: 30,
        borderRadius: '10px',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        color,
        background: alpha(color, 0.12),
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Icon sx={{ fontSize: 17 }} />
  </Box>
)

export default KpiIcon
