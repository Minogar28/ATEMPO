import { useState } from 'react'
import { useNavigate } from 'react-router'
import { HttpError } from '@src/services/http'
import { useAuth } from '@src/states/AuthContext'
import { alertError } from '@src/helpers/alert'
import type { LoginFormInputs } from './types'

// El identificador acepta correo o cédula; si son solo dígitos se envía como cédula.
const esCedula = (valor: string): boolean => /^\d{6,12}$/.test(valor.trim())

export const useLogin = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = async ({ identificador, password, rol }: LoginFormInputs) => {
    setLoading(true)
    try {
      await login(
        esCedula(identificador)
          ? { cedula: identificador.trim(), password, rol }
          : { email: identificador.trim(), password, rol },
      )
      navigate('/home', { replace: true })
    } catch (error) {
      const message =
        error instanceof HttpError && error.status === 401
          ? 'Credenciales incorrectas.'
          : 'No se pudo iniciar sesión. Intenta de nuevo.'
      alertError('Error de acceso', message)
    } finally {
      setLoading(false)
    }
  }

  return { handleLogin, loading }
}
