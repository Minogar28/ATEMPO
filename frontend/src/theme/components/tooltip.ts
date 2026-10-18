import { alpha } from '@mui/material/styles'
import type { Components, Theme } from '@mui/material/styles'
import { brandTokens } from '../brand'

export const tooltipOverrides: Components<Theme> = {
  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: {
        fontSize: '0.72rem',
        fontWeight: 500,
        padding: '6px 10px',
        borderRadius: 10,
        backgroundColor: alpha(brandTokens.deepBlue, 0.95),
        color: brandTokens.cream,
        border: `1px solid ${alpha('#ffffff', 0.12)}`,
        backdropFilter: 'blur(16px)',
      },
      arrow: {
        color: alpha(brandTokens.deepBlue, 0.95),
      },
    },
  },
}
