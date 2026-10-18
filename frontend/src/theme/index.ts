import { createTheme } from '@mui/material/styles'
import type { PaletteMode, Theme } from '@mui/material/styles'
import { breakpoints } from './grid'
import { darkPalette, lightPalette } from './palette'
import { typography } from './typography'
import { shadows } from './shadow'
import { brandTokens } from './brand'
import { componentOverrides } from './components'

export const createAppTheme = (mode: PaletteMode): Theme =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    breakpoints,
    shadows: shadows(mode),
    shape: { borderRadius: brandTokens.borderRadius },
    components: componentOverrides,
  })
