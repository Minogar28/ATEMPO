import { alpha } from '@mui/material/styles'
import type { Components, Theme } from '@mui/material/styles'
import { brandTokens } from '../brand'

export const formOverrides: Components<Theme> = {
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
      fullWidth: true,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 12,
        background: alpha('#ffffff', theme.palette.mode === 'dark' ? 0.05 : 0.5),
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: alpha('#ffffff', theme.palette.mode === 'dark' ? 0.1 : 0.35),
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: alpha('#ffffff', theme.palette.mode === 'dark' ? 0.2 : 0.5),
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: alpha(brandTokens.mustard, 0.45),
          borderWidth: 1,
        },
        '&.Mui-focused': {
          boxShadow: `0 0 0 3px ${alpha(brandTokens.mustard, 0.1)}`,
        },
      }),
      input: ({ theme }) => ({
        '&::placeholder': {
          color: alpha(theme.palette.text.primary, 0.3),
          opacity: 1,
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.4),
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }),
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { borderRadius: 12, paddingInline: 18 },
      sizeLarge: { paddingBlock: 12 },
    },
    variants: [
      {
        props: { variant: 'contained', color: 'primary' },
        style: {
          background: `linear-gradient(135deg, ${brandTokens.mustard}, ${brandTokens.mustardDark})`,
          color: brandTokens.navy,
          fontWeight: 600,
          '&:hover': {
            background: `linear-gradient(135deg, #f0d070, ${brandTokens.mustard})`,
          },
        },
      },
    ],
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.6),
      }),
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: { color: brandTokens.mustard },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: { marginInlineStart: 4 },
    },
  },
}
