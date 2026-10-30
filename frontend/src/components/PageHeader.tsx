import { Box, Typography } from '@mui/material'
import type { MenuIcon } from '@src/helpers/menu'
import { glassMustardSx } from '@src/theme/brand'
import { displayFont } from '@src/theme/typography'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: MenuIcon
}

// Encabezado editorial de página: icono del módulo + título en DM Serif Display
// + subtítulo calmado. Consolidado para que todos los módulos compartan la
// misma jerarquía.
const PageHeader = ({ title, subtitle, icon: Icon }: PageHeaderProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    {Icon && (
      <Box
        sx={[
          glassMustardSx,
          { width: 44, height: 44, borderRadius: '14px', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'primary.main' },
        ]}
      >
        <Icon sx={{ fontSize: 24, width: 24, height: 24, m: 0 }} />
      </Box>
    )}
    <Box sx={{ minWidth: 0 }}>
      <Typography sx={{ fontFamily: displayFont, fontSize: '1.7rem' }}>{title}</Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
      )}
    </Box>
  </Box>
)

export default PageHeader
