import type { PaletteOptions } from '@mui/material/styles'
import { statusColors } from './status'

// Dark-first: la identidad Atempo es navy profundo + mustard sobre vidrio.
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#E2B84A',
    light: '#f0d070',
    dark: '#c9a035',
    contrastText: '#0C1F3C',
  },
  secondary: {
    main: '#60a5fa',
    light: '#93c5fd',
    dark: '#3b82f6',
    contrastText: '#0C1F3C',
  },
  error: { main: '#f87171' },
  success: { main: '#4ade80' },
  warning: { main: '#E2B84A' },
  info: { main: '#60a5fa' },
  background: {
    default: '#0C1F3C',
    paper: '#1F3A5F',
  },
  text: {
    primary: '#FAF6ED',
    secondary: 'rgba(250, 246, 237, 0.55)',
    disabled: 'rgba(250, 246, 237, 0.28)',
  },
  divider: 'rgba(255, 255, 255, 0.08)',
  status: statusColors,
}

// Variante clara: crema esmerilado, mismo acento mustard.
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#c9a035',
    light: '#E2B84A',
    dark: '#9a7523',
    contrastText: '#0C1F3C',
  },
  secondary: {
    main: '#1F3A5F',
    light: '#3a5c8a',
    dark: '#0C1F3C',
    contrastText: '#FAF6ED',
  },
  error: { main: '#dc2626' },
  success: { main: '#16a34a' },
  warning: { main: '#c9a035' },
  info: { main: '#2563eb' },
  background: {
    default: '#FAF6ED',
    paper: '#ffffff',
  },
  text: {
    primary: '#111827',
    secondary: 'rgba(17, 24, 39, 0.55)',
    disabled: 'rgba(17, 24, 39, 0.3)',
  },
  divider: 'rgba(12, 31, 60, 0.1)',
  status: statusColors,
}
