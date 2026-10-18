import { STORAGE_KEYS } from '@src/config/api'

// Fotos de perfil y logo de empresa subidas por el usuario — se guardan como
// data URL en localStorage hasta que exista storage real de archivos.

const fotoKey = (userId: string | number) => `${STORAGE_KEYS.perfil}.foto.${userId}`
const LOGO_KEY = `${STORAGE_KEYS.perfil}.logoEmpresa`

// Evento interno para que el sidebar y otros componentes reaccionen cuando
// cambia la foto o el logo sin recargar la página.
const PERFIL_EVENT = 'atempo:perfil'

const notify = () => window.dispatchEvent(new Event(PERFIL_EVENT))

export const subscribePerfil = (listener: () => void): (() => void) => {
  window.addEventListener(PERFIL_EVENT, listener)
  return () => window.removeEventListener(PERFIL_EVENT, listener)
}

export const getFotoPerfil = (userId: string | number): string | null =>
  localStorage.getItem(fotoKey(userId))

export const saveFotoPerfil = (userId: string | number, dataUrl: string): void => {
  try {
    localStorage.setItem(fotoKey(userId), dataUrl)
    notify()
  } catch {
    // data URL demasiado grande para localStorage
  }
}

export const getLogoEmpresa = (): string | null => localStorage.getItem(LOGO_KEY)

export const saveLogoEmpresa = (dataUrl: string): void => {
  try {
    localStorage.setItem(LOGO_KEY, dataUrl)
    notify()
  } catch {
    // data URL demasiado grande para localStorage
  }
}

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
    reader.readAsDataURL(file)
  })
