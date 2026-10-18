export const API_URL = import.meta.env.VITE_API_URL ?? ''

export const APP_NAME = 'ATEMPO'

export const STORAGE_KEYS = {
  auth: 'atempo.auth',
  layout: 'atempo.layout',
  guias: 'atempo.guias',
  gestion: 'atempo.gestion',
  citas: 'atempo.citas',
  episodios: 'atempo.episodios',
  pausas: 'atempo.pausas',
  perfil: 'atempo.perfil',
} as const
