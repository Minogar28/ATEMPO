import type { TypographyVariantsOptions } from '@mui/material/styles'

export const displayFont = '"DM Serif Display", Georgia, serif'
export const bodyFont = '"Outfit", system-ui, sans-serif'
export const monoFont = '"DM Mono", ui-monospace, monospace'

export const typography: TypographyVariantsOptions = {
  fontFamily: bodyFont,
  h1: { fontFamily: displayFont, fontWeight: 400 },
  h2: { fontFamily: displayFont, fontWeight: 400 },
  h3: { fontFamily: displayFont, fontWeight: 400 },
  h4: { fontFamily: displayFont, fontWeight: 400 },
  h5: { fontFamily: displayFont, fontWeight: 400 },
  h6: { fontFamily: displayFont, fontWeight: 400 },
  subtitle1: { fontWeight: 500 },
  subtitle2: { fontWeight: 500 },
  button: { textTransform: 'none', fontWeight: 600 },
  overline: {
    fontWeight: 500,
    fontSize: '0.62rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
}

// Métricas y números del semáforo usan la mono del sistema.
export const monoSx = { fontFamily: monoFont }
