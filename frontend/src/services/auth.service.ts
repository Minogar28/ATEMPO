import { API_URL } from '@src/config/api'
import { http } from './http'

export type Role = 'superadmin' | 'empresa' | 'psicologo' | 'paciente'

export interface AuthUser {
  id: number | string
  name: string
  email: string
  cedula?: string
  roles: Role[]
  modulos?: string[]
  empresa?: string
  // Datos de bienestar del paciente (opcionales según rol)
  xp?: number
  streak?: number
  stressLevel?: number
}

export interface AuthState {
  token: string
  user: AuthUser
}

export interface LoginCredentials {
  email?: string
  password?: string
  cedula?: string
  rol?: Role
}

const MODULOS_PACIENTE = ['/home', '/careband', '/monitoreo', '/autorregulacion', '/agenda', '/avatar', '/cuenta']
const MODULOS_PSICOLOGO = ['/home', '/mi-panel', '/reportes', '/cuenta']
const MODULOS_EMPRESA = ['/home', '/empresa', '/gestion', '/reportes', '/cuenta']
const MODULOS_TODOS = [
  '/home', '/careband', '/monitoreo', '/autorregulacion', '/agenda', '/avatar',
  '/mi-panel', '/empresa', '/gestion', '/reportes', '/cuenta',
]

const USUARIOS_DEMO: Record<Role, AuthUser> = {
  paciente: {
    id: 1,
    name: 'Valentina Ríos',
    email: 'valentina.rios@mail.co',
    cedula: '1023456789',
    roles: ['paciente'],
    empresa: 'TechCorp Colombia',
    xp: 2340,
    streak: 7,
    stressLevel: 42,
    modulos: MODULOS_PACIENTE,
  },
  psicologo: {
    id: 2,
    name: 'Dra. Camila Torres',
    email: 'ctorres@atempo.co',
    cedula: '52144770',
    roles: ['psicologo'],
    empresa: 'TechCorp Colombia',
    modulos: MODULOS_PSICOLOGO,
  },
  empresa: {
    id: 3,
    name: 'Juliana Mora',
    email: 'jmora@techcorp.co',
    roles: ['empresa'],
    empresa: 'TechCorp Colombia',
    modulos: MODULOS_EMPRESA,
  },
  superadmin: {
    id: 0,
    name: 'Admin ATEMPO',
    email: 'admin@atempo.co',
    roles: ['superadmin'],
    xp: 2340,
    streak: 7,
    stressLevel: 42,
    modulos: MODULOS_TODOS,
  },
}

// Sin VITE_API_URL se usa un usuario demo según el rol elegido en el login.
// superadmin ve todos los módulos; los demás ven solo su sección.
const mockLogin = async (rol: Role = 'paciente'): Promise<AuthState> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return { token: 'dev-token', user: { ...USUARIOS_DEMO[rol] } }
}

export const login = (credentials: LoginCredentials): Promise<AuthState> =>
  API_URL ? http.post<AuthState>('/auth/login', credentials) : mockLogin(credentials.rol)
