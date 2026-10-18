import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { STORAGE_KEYS } from '@src/config/api'
import { useLocalStorage } from '@src/hooks/useLocalStorage'
import { changeHTMLAttribute } from '@src/helpers/menu'

export type ThemeMode = 'light' | 'dark'

export interface LayoutSettings {
  themeMode: ThemeMode
  sidenavCollapsed: boolean
}

const DEFAULT_SETTINGS: LayoutSettings = {
  themeMode: 'dark',
  sidenavCollapsed: false,
}

interface LayoutContextValue {
  settings: LayoutSettings
  updateSettings: (patch: Partial<LayoutSettings>) => void
  toggleThemeMode: () => void
  toggleSidenav: () => void
}

const LayoutContext = createContext<LayoutContextValue | null>(null)

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useLocalStorage<LayoutSettings>(
    STORAGE_KEYS.layout,
    DEFAULT_SETTINGS,
  )

  const updateSettings = useCallback(
    (patch: Partial<LayoutSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...patch }
        if (patch.themeMode) changeHTMLAttribute('data-theme', patch.themeMode)
        return next
      })
    },
    [setSettings],
  )

  const toggleThemeMode = useCallback(
    () =>
      updateSettings({
        themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
      }),
    [settings.themeMode, updateSettings],
  )

  const toggleSidenav = useCallback(
    () => updateSettings({ sidenavCollapsed: !settings.sidenavCollapsed }),
    [settings.sidenavCollapsed, updateSettings],
  )

  const value = useMemo<LayoutContextValue>(
    () => ({
      settings,
      updateSettings,
      toggleThemeMode,
      toggleSidenav,
    }),
    [settings, updateSettings, toggleThemeMode, toggleSidenav],
  )

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLayout = (): LayoutContextValue => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout debe usarse dentro de <LayoutProvider>')
  }
  return context
}
