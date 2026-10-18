import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { LockRounded } from '@mui/icons-material'
import { API_URL, APP_NAME } from '@src/config/api'
import { FormInput, PasswordInput, SelectInput } from '@src/components'
import { glassStrongSx, riseInSx } from '@src/theme/brand'
import { useLogin } from './useLogin'
import type { LoginFormInputs } from './types'

const identificadorValido = (valor: string): true | string => {
  const v = valor.trim()
  if (!v) return 'Ingresa tu correo o cédula'
  if (/^\d{6,12}$/.test(v)) return true
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return true
  return 'Ingresa un correo válido o una cédula (6–12 dígitos)'
}

const Login = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: { identificador: '', password: '', rol: 'paciente' },
  })
  const { handleLogin, loading } = useLogin()

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      sx={[glassStrongSx, riseInSx, { p: { xs: 2.5, sm: 3.5 }, borderRadius: 3 }]}
    >
      <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, mb: 0.5 }}>
        Iniciar sesión
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Accede a tu espacio de bienestar.
      </Typography>

      <Stack spacing={2.5}>
        <FormInput
          name="identificador"
          control={control}
          label="Correo o cédula"
          autoComplete="username"
          rules={{ validate: identificadorValido }}
        />
        <PasswordInput
          name="password"
          control={control}
          rules={{ required: 'La contraseña es obligatoria' }}
        />
        <SelectInput
          name="rol"
          control={control}
          label="Tipo de usuario"
          options={[
            { value: 'paciente', label: 'Paciente' },
            { value: 'psicologo', label: 'Psicólogo' },
            { value: 'empresa', label: 'Administrador de empresa' },
            { value: 'superadmin', label: 'Superadministrador' },
          ]}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={loading && <CircularProgress size={16} color="inherit" />}
        >
          {loading ? 'Ingresando…' : 'Entrar'}
        </Button>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mt: 3, mb: 1.5 }} />
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <LockRounded sx={{ fontSize: 13, color: 'primary.main' }} />
        <Typography variant="caption" color="text.secondary" align="center">
          {!API_URL
            ? `Modo demo · ${APP_NAME} — el menú se adapta al rol elegido`
            : 'Tus datos de salud están protegidos · Ley 1581 de 2012'}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default Login
