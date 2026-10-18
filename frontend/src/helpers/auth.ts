import { STORAGE_KEYS } from '@src/config/api'
import type { AuthState } from '@src/services/auth.service'

export const getAuthToken = (): string | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.auth)
    return raw ? (JSON.parse(raw) as AuthState).token : null
  } catch {
    return null
  }
}

export const redirectOnUnauthorized = (): void => {
  localStorage.removeItem(STORAGE_KEYS.auth)
  window.location.assign('/auth/login')
}
