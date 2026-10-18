/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import type { ReactElement } from 'react'
import AuthLayout2 from '@src/pages/auth/AuthLayout2'
import { MODULES } from './modules'

const Login = lazy(() => import('@src/pages/auth/Login'))
const Logout = lazy(() => import('@src/pages/auth/Logout'))
const Landing = lazy(() => import('@src/pages/landing'))
const Error404 = lazy(() => import('@src/pages/error/Error404'))
const Error500 = lazy(() => import('@src/pages/error/Error500'))

export interface AppRoute {
  path: string
  element: ReactElement
  /** Solo accesible sin sesión: si hay sesión activa redirige a /home. */
  guestOnly?: boolean
}

export const publicRoutes: AppRoute[] = [
  { path: '/landing', element: <Landing /> },
  {
    path: '/auth/login',
    element: (
      <AuthLayout2>
        <Login />
      </AuthLayout2>
    ),
    guestOnly: true,
  },
  { path: '/auth/logout', element: <Logout /> },
]

// Las rutas privadas se derivan del registro MODULES (una sola fuente).
export const privateRoutes: AppRoute[] = MODULES.map(({ path, element }) => ({
  path,
  element,
}))

export const errorRoutes: AppRoute[] = [
  { path: '/error/404', element: <Error404 /> },
  { path: '/error/500', element: <Error500 /> },
]
