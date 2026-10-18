import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { FullScreenLoader } from '@src/components'
import { usePermissions } from '@src/hooks/usePermissions'
import DefaultLayout from '@src/layouts/DefaultLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import { useAuth } from '@src/states/AuthContext'
import { errorRoutes, privateRoutes, publicRoutes } from './routes'

const Router = () => {
  const { isAuthenticated } = useAuth()
  const { canAccess } = usePermissions()

  return (
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          {/* Rutas públicas y de error → layout mínimo */}
          <Route element={<DefaultLayout />}>
            {publicRoutes.map(({ path, element, guestOnly }) => (
              <Route
                key={path}
                path={path}
                element={
                  guestOnly && isAuthenticated ? (
                    <Navigate to="/home" replace />
                  ) : (
                    element
                  )
                }
              />
            ))}
            {errorRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

          {/* Rutas privadas → app shell, filtradas por permisos del usuario */}
          <Route
            element={
              isAuthenticated ? (
                <VerticalLayout />
              ) : (
                <Navigate to="/landing" replace />
              )
            }
          >
            {privateRoutes
              .filter(({ path }) => canAccess(path))
              .map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
          </Route>

          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? '/home' : '/landing'} replace />
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
