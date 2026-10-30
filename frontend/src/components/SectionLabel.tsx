import { Typography } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import type { ReactNode } from 'react'

// Etiqueta de sección en mayúsculas con tracking amplio (firma del diseño).
const SectionLabel = ({ children, icon: Icon }: { children: ReactNode; icon?: SvgIconComponent }) => (
  <Typography
    variant="overline"
    color="text.secondary"
    sx={{ display: Icon ? 'flex' : 'block', alignItems: 'center', gap: 0.75, mb: 1 }}
  >
    {Icon && <Icon sx={{ fontSize: 15, color: 'primary.main' }} />}
    {children}
  </Typography>
)

export default SectionLabel
