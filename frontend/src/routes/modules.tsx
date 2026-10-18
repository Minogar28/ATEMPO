/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import type { ReactElement } from 'react'
import type { Role } from '@src/services/auth.service'

const Home = lazy(() => import('@src/pages/home'))
const Careband = lazy(() => import('@src/pages/careband'))
const Monitoreo = lazy(() => import('@src/pages/monitoreo'))
const Autorregulacion = lazy(() => import('@src/pages/autorregulacion'))
const Agenda = lazy(() => import('@src/pages/agenda'))
const Avatar = lazy(() => import('@src/pages/avatar'))
const MiPanel = lazy(() => import('@src/pages/mi-panel'))
const Empresa = lazy(() => import('@src/pages/empresa'))
const Gestion = lazy(() => import('@src/pages/gestion'))
const Reportes = lazy(() => import('@src/pages/reportes'))
const Cuenta = lazy(() => import('@src/pages/cuenta'))

export type MenuSection = 'Paciente' | 'Profesional' | 'Cuenta'

export interface ModuleDef {
  key: string
  path: string
  label: string
  section: MenuSection
  roles: Role[]
  element: ReactElement
}

export const ALL_ROLES: Role[] = ['superadmin', 'empresa', 'psicologo', 'paciente']

// ÚNICA fuente de verdad: de aquí se derivan rutas privadas, menú y permisos.
export const MODULES: ModuleDef[] = [
  {
    key: 'home',
    path: '/home',
    label: 'Inicio',
    section: 'Paciente',
    roles: ALL_ROLES,
    element: <Home />,
  },
  {
    key: 'careband',
    path: '/careband',
    label: 'CAREband',
    section: 'Paciente',
    roles: ['paciente'],
    element: <Careband />,
  },
  {
    key: 'monitoreo',
    path: '/monitoreo',
    label: 'Monitoreo',
    section: 'Paciente',
    roles: ['paciente'],
    element: <Monitoreo />,
  },
  {
    key: 'autorregulacion',
    path: '/autorregulacion',
    label: 'Autorregulación',
    section: 'Paciente',
    roles: ['paciente'],
    element: <Autorregulacion />,
  },
  {
    key: 'agenda',
    path: '/agenda',
    label: 'Citas',
    section: 'Paciente',
    roles: ['paciente'],
    element: <Agenda />,
  },
  {
    key: 'avatar',
    path: '/avatar',
    label: 'Avatar',
    section: 'Paciente',
    roles: ['paciente'],
    element: <Avatar />,
  },
  {
    key: 'mi-panel',
    path: '/mi-panel',
    label: 'Mi Panel',
    section: 'Profesional',
    roles: ['psicologo'],
    element: <MiPanel />,
  },
  {
    key: 'empresa',
    path: '/empresa',
    label: 'Empresas',
    section: 'Profesional',
    roles: ['empresa'],
    element: <Empresa />,
  },
  {
    key: 'gestion',
    path: '/gestion',
    label: 'Gestión',
    section: 'Profesional',
    roles: ['empresa', 'superadmin'],
    element: <Gestion />,
  },
  {
    key: 'reportes',
    path: '/reportes',
    label: 'Reportes',
    section: 'Profesional',
    roles: ['empresa', 'psicologo'],
    element: <Reportes />,
  },
  {
    key: 'cuenta',
    path: '/cuenta',
    label: 'Perfil',
    section: 'Cuenta',
    roles: ALL_ROLES,
    element: <Cuenta />,
  },
]
