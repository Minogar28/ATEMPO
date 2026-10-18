import { Controller } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import VisibilityOffRounded from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRounded from '@mui/icons-material/VisibilityRounded'
import { useToggle } from '@src/hooks/useToggle'
import type { FieldValues } from 'react-hook-form'
import type { ControlledInputProps } from './types'

export const PasswordInput = <T extends FieldValues>({
  name,
  control,
  label = 'Contraseña',
  placeholder,
  rules,
  disabled,
  autoComplete = 'current-password',
}: ControlledInputProps<T>) => {
  const [visible, { toggle }] = useToggle(false)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={visible ? 'text' : 'password'}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    edge="end"
                    onClick={toggle}
                    aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {visible ? <VisibilityOffRounded /> : <VisibilityRounded />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  )
}
