import { alpha } from '@mui/material/styles'
import type { Components, Theme } from '@mui/material/styles'
import { brandTokens } from '../brand'

const dark = (theme: Theme) => theme.palette.mode === 'dark'

export const surfaceOverrides: Components<Theme> = {
  // Paper/Card con look glass por defecto (la firma visual del producto).
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: 'none',
        background: alpha(brandTokens.deepBlue, dark(theme) ? 0.32 : 0.08),
        backdropFilter: 'blur(28px) saturate(180%)',
        border: `1px solid ${alpha('#ffffff', dark(theme) ? 0.1 : 0.55)}`,
        boxShadow: `0 4px 24px rgba(0,0,0,${dark(theme) ? 0.22 : 0.08}), inset 0 1px 0 ${alpha('#ffffff', dark(theme) ? 0.07 : 0.6)}`,
      }),
      rounded: { borderRadius: 14 },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: { borderRadius: 14 },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundImage: 'none',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        background: alpha(brandTokens.navy, dark(theme) ? 0.85 : 0.9),
        color: brandTokens.cream,
        backdropFilter: 'blur(28px) saturate(200%)',
        borderRadius: 16,
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        background: alpha(brandTokens.navy, dark(theme) ? 0.8 : 0.92),
        backdropFilter: 'blur(36px) saturate(210%)',
        borderRadius: 24,
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 10, fontWeight: 500 },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        background: `linear-gradient(135deg, ${alpha(brandTokens.mustard, 0.8)}, ${brandTokens.deepBlue})`,
        color: '#ffffff',
        fontWeight: 600,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: alpha('#ffffff', dark(theme) ? 0.06 : 0.4),
      }),
    },
  },
  MuiSwitch: {
    styleOverrides: {
      switchBase: {
        '&.Mui-checked': { color: brandTokens.mustard },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: brandTokens.mustard,
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: { borderRadius: 999, backgroundColor: alpha('#ffffff', 0.07) },
      bar: {
        borderRadius: 999,
        background: `linear-gradient(90deg, ${brandTokens.mustardDark}, ${brandTokens.mustard}, #f0d070)`,
      },
    },
  },
}
