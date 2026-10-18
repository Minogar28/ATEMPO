import type { Role } from '@src/services/auth.service'

export interface LoginFormInputs {
  identificador: string // correo o cédula
  password: string
  rol: Role
}
