import { useEffect } from 'react'
import { Navigate } from 'react-router'
import { FullScreenLoader } from '@src/components'
import { useAuth } from '@src/states/AuthContext'

const Logout = () => {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return (
    <>
      <FullScreenLoader />
      <Navigate to="/auth/login" replace />
    </>
  )
}

export default Logout
