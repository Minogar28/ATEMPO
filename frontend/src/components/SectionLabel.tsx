import { Typography } from '@mui/material'
import type { ReactNode } from 'react'

// Etiqueta de sección en mayúsculas con tracking amplio (firma del diseño).
const SectionLabel = ({ children }: { children: ReactNode }) => (
  <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
    {children}
  </Typography>
)

export default SectionLabel
