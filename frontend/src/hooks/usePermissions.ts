import { useCallback, useMemo } from 'react'
import { useAuth } from '@src/states/AuthContext'
import { ALWAYS_ALLOWED_PATHS } from '@src/helpers/permissions'
import { MODULES } from '@src/routes/modules'
import type { Role } from '@src/services/auth.service'

const matches = (allowed: string, path: string): boolean =>
  path === allowed || path.startsWith(`${allowed}/`)

// Las rutas privadas se filtran por rol (registro MODULES) y por los paths
// (`modulos`) que devuelva el backend en el login. superadmin ve todo.
export const usePermissions = () => {
  const { user } = useAuth()
  const roles = useMemo(() => user?.roles ?? [], [user])
  const isSuper = roles.includes('superadmin')
  const extraPaths = useMemo(() => user?.modulos ?? [], [user])

  const canAccess = useCallback(
    (path: string) => {
      if (ALWAYS_ALLOWED_PATHS.some((p) => matches(p, path))) return true
      if (extraPaths.some((p) => matches(p, path))) return true
      const mod = MODULES.find((m) => matches(m.path, path))
      if (!mod) return isSuper
      return isSuper || mod.roles.some((r: Role) => roles.includes(r))
    },
    [isSuper, roles, extraPaths],
  )

  const hasRole = useCallback(
    (...wanted: Role[]) => wanted.some((r) => roles.includes(r)),
    [roles],
  )

  const visibleModules = useMemo(
    () => MODULES.filter((m) => canAccess(m.path)),
    [canAccess],
  )

  return { canAccess, hasRole, visibleModules, isSuper }
}
