import { createTheme } from '@mui/material/styles'
import type { PaletteMode, Shadows } from '@mui/material/styles'

const baseShadows = createTheme().shadows

const buildShadows = (opacity: number): Shadows =>
  [
    'none',
    `0 1px 2px rgba(0, 0, 0, ${opacity})`,
    `0 2px 6px rgba(0, 0, 0, ${opacity})`,
    `0 4px 12px rgba(0, 0, 0, ${opacity})`,
    `0 6px 16px rgba(0, 0, 0, ${opacity})`,
    `0 8px 24px rgba(0, 0, 0, ${opacity + 0.04})`,
    `0 8px 32px rgba(0, 0, 0, ${opacity + 0.06})`,
    `0 16px 40px rgba(0, 0, 0, ${opacity + 0.08})`,
    ...baseShadows.slice(8),
  ] as Shadows

export const shadows = (mode: PaletteMode): Shadows =>
  mode === 'light' ? buildShadows(0.08) : buildShadows(0.32)
