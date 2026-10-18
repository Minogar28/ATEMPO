import { alpha } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

// Tokens de marca + utilidades sx reusables (usar como sx={glassSx} o en array).

export const brandTokens = {
  navy: '#0C1F3C',
  deepBlue: '#1F3A5F',
  mustard: '#E2B84A',
  mustardDark: '#c9a035',
  cream: '#FAF6ED',
  dark: '#111827',
  sidenavWidth: 240,
  sidenavCollapsedWidth: 76,
  topbarHeight: 64,
  borderRadius: 16,
}

const isDark = (theme: Theme) => theme.palette.mode === 'dark'

// ── Liquid glass layers (del prototipo) ───────────────────
export const glassSx = (theme: Theme) => ({
  background: alpha('#ffffff', isDark(theme) ? 0.055 : 0.55),
  backdropFilter: 'blur(22px) saturate(190%)',
  border: `1px solid ${alpha('#ffffff', isDark(theme) ? 0.11 : 0.6)}`,
})

export const glassStrongSx = (theme: Theme) => ({
  background: alpha('#ffffff', isDark(theme) ? 0.09 : 0.7),
  backdropFilter: 'blur(36px) saturate(210%)',
  border: `1px solid ${alpha('#ffffff', isDark(theme) ? 0.16 : 0.7)}`,
  boxShadow: `0 8px 32px rgba(0,0,0,${isDark(theme) ? 0.28 : 0.12}), inset 0 1px 0 ${alpha('#ffffff', isDark(theme) ? 0.12 : 0.7)}`,
})

export const glassCardSx = (theme: Theme) => ({
  background: alpha(brandTokens.deepBlue, isDark(theme) ? 0.32 : 0.08),
  backdropFilter: 'blur(28px) saturate(180%)',
  border: `1px solid ${alpha('#ffffff', isDark(theme) ? 0.1 : 0.55)}`,
  boxShadow: `0 4px 24px rgba(0,0,0,${isDark(theme) ? 0.22 : 0.08}), inset 0 1px 0 ${alpha('#ffffff', isDark(theme) ? 0.07 : 0.6)}`,
})

export const glassMustardSx = {
  background: alpha(brandTokens.mustard, 0.13),
  backdropFilter: 'blur(20px) saturate(180%)',
  border: `1px solid ${alpha(brandTokens.mustard, 0.32)}`,
  boxShadow: `0 2px 12px ${alpha(brandTokens.mustard, 0.08)}`,
}

export const glassSidebarSx = (theme: Theme) => ({
  background: alpha(brandTokens.navy, isDark(theme) ? 0.72 : 0.85),
  backdropFilter: 'blur(40px) saturate(220%)',
  border: `1px solid ${alpha('#ffffff', isDark(theme) ? 0.1 : 0.2)}`,
  boxShadow: `4px 0 40px rgba(0,0,0,${isDark(theme) ? 0.35 : 0.15}), inset 1px 0 0 ${alpha('#ffffff', 0.06)}`,
  color: brandTokens.cream,
})

export const glassBottombarSx = {
  background: alpha(brandTokens.navy, 0.8),
  backdropFilter: 'blur(40px) saturate(220%)',
  border: `1px solid ${alpha('#ffffff', 0.12)}`,
  boxShadow: `0 -4px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${alpha('#ffffff', 0.08)}`,
  color: brandTokens.cream,
}

// ── Nav activo / fondo animado / orbs ─────────────────────
export const navActiveSx = {
  background: `linear-gradient(135deg, ${alpha(brandTokens.mustard, 0.18)}, ${alpha(brandTokens.mustard, 0.08)})`,
  border: `1px solid ${alpha(brandTokens.mustard, 0.28)}`,
  boxShadow: `inset 0 1px 0 ${alpha(brandTokens.mustard, 0.15)}`,
}

export const bgAnimatedSx = (theme: Theme) => ({
  background: isDark(theme)
    ? `radial-gradient(ellipse at 15% 40%, ${alpha(brandTokens.deepBlue, 0.9)} 0%, transparent 55%),
       radial-gradient(ellipse at 85% 10%, ${alpha(brandTokens.dark, 0.8)} 0%, transparent 50%),
       radial-gradient(ellipse at 55% 85%, ${alpha(brandTokens.dark, 0.7)} 0%, transparent 55%),
       ${brandTokens.navy}`
    : `radial-gradient(ellipse at 15% 40%, ${alpha(brandTokens.deepBlue, 0.12)} 0%, transparent 55%),
       radial-gradient(ellipse at 85% 10%, ${alpha(brandTokens.mustard, 0.1)} 0%, transparent 50%),
       ${theme.palette.background.default}`,
})

export const orbSx = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(90px)',
  pointerEvents: 'none',
  willChange: 'transform',
}

// ── Botón primario de marca (gradiente mustard) ───────────
export const mustardButtonSx = {
  background: `linear-gradient(135deg, ${brandTokens.mustard}, ${brandTokens.mustardDark})`,
  color: brandTokens.navy,
  fontWeight: 600,
  '&:hover': {
    background: `linear-gradient(135deg, #f0d070, ${brandTokens.mustard})`,
  },
}

// ── Misceláneos ───────────────────────────────────────────
export const riseInSx = {
  animation: 'riseIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
}

export const focusRingSx = (theme: Theme) => ({
  '&:focus-visible': {
    outline: `2px solid ${alpha(theme.palette.primary.main, 0.6)}`,
    outlineOffset: 2,
  },
})

export const progressBarSx = {
  background: `linear-gradient(90deg, ${brandTokens.mustardDark}, ${brandTokens.mustard}, #f0d070)`,
  borderRadius: 999,
}

// Glows del avatar climático según estado.
export const avatarGlowSx = (clima: 'sun' | 'cloud' | 'storm') =>
  ({
    sun: `0 0 48px ${alpha(brandTokens.mustard, 0.55)}, 0 0 96px ${alpha(brandTokens.mustard, 0.18)}`,
    cloud: '0 0 48px rgba(100,140,180,0.45), 0 0 96px rgba(100,140,180,0.15)',
    storm: '0 0 48px rgba(80,60,160,0.55), 0 0 96px rgba(80,60,160,0.18)',
  })[clima]
