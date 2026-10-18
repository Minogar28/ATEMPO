declare module '@mui/material/styles' {
  interface Palette {
    status: StatusColors
  }
  interface PaletteOptions {
    status?: Partial<StatusColors>
  }
}

interface StatusColors {
  ok: string
  warning: string
  critical: string
  neutral: string
  info: string
  accent: string
}

export {}
