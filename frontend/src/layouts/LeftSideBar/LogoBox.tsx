import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router'
import { brandTokens, glassMustardSx } from '@src/theme/brand'
import { displayFont } from '@src/theme/typography'

// Badge de marca del prototipo: "A" serif sobre vidrio mustard + nombre + subtítulo.
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
    <Box
      sx={[
        glassMustardSx,
        {
          width: 36,
          height: 36,
          borderRadius: '16px',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        },
      ]}
    >
      <Typography sx={{ fontFamily: displayFont, fontSize: '1.1rem', lineHeight: 1, color: brandTokens.mustard, fontWeight: 700 }}>
        A
      </Typography>
    </Box>
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
