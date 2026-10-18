import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { STORAGE_KEYS } from '@src/config/api'
import { useLocalStorage } from '@src/hooks/useLocalStorage'
import * as authService from '@src/services/auth.service'
import type {
  AuthState,
  AuthUser,
  LoginCredentials,
} from '@src/services/auth.service'

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useLocalStorage<AuthState | null>(
    STORAGE_KEYS.auth,
    null,
  )

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const { token, user } = await authService.login(credentials)
      setAuth({ token, user })
    },
    [setAuth],
  )

  const logout = useCallback(() => setAuth(null), [setAuth])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: auth?.user ?? null,
      token: auth?.token ?? null,
      isAuthenticated: Boolean(auth?.token),
      login,
      logout,
    }),
    [auth, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}
