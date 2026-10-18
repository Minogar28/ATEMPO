import { alpha } from '@mui/material/styles'
import type { Components, Theme } from '@mui/material/styles'

export const tableOverrides: Components<Theme> = {
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiTableCell-head': {
          fontWeight: 500,
          fontSize: '0.62rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: theme.palette.text.secondary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha('#ffffff', theme.palette.mode === 'dark' ? 0.03 : 0.35),
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${alpha('#ffffff', theme.palette.mode === 'dark' ? 0.05 : 0.4)}`,
        paddingBlock: 14,
      }),
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:last-child .MuiTableCell-root': { borderBottom: 0 },
        '&.MuiTableRow-hover:hover': {
          backgroundColor: alpha('#ffffff', theme.palette.mode === 'dark' ? 0.04 : 0.4),
        },
      }),
    },
  },
}
