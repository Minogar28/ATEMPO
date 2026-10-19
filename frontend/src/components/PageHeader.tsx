import { Box, Typography } from '@mui/material'
import { displayFont } from '@src/theme/typography'

// Encabezado editorial de página: título en DM Serif Display + subtítulo
// calmado. Consolidado para que todos los módulos compartan la misma jerarquía.
const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <Box>
    <Typography sx={{ fontFamily: displayFont, fontSize: '1.7rem' }}>{title}</Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
    )}
  </Box>
)

export default PageHeader
