import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router'
import { AppLogo } from '@src/components'
import { brandTokens } from '@src/theme/brand'
import { displayFont } from '@src/theme/typography'

// Badge de marca: logo de la app + nombre + subtítulo.
const LogoBox = ({ collapsed }: { collapsed: boolean }) => (
  <Box
    component={RouterLink}
    to="/home"
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      textDecoration: 'none',
      color: 'inherit',
      justifyContent: collapsed ? 'center' : 'flex-start',
    }}
  >
    <AppLogo size={36} />
    {!collapsed && (
      <Box>
        <Typography sx={{ fontFamily: displayFont, fontSize: '1rem', lineHeight: 1, color: 'text.primary' }}>
          Atempo
        </Typography>
        <Typography sx={{ fontSize: '0.625rem', color: alpha(brandTokens.mustard, 0.55), letterSpacing: '0.05em', mt: 0.25 }}>
          Bienestar Psicológico
        </Typography>
      </Box>
    )}
  </Box>
)

export default LogoBox
