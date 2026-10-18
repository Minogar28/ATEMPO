import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import type { FieldValues } from 'react-hook-form'
import type { ControlledInputProps } from './types'

interface FormInputProps<T extends FieldValues> extends ControlledInputProps<T> {
  type?: string
  multiline?: boolean
  rows?: number
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  disabled,
  autoComplete,
  type = 'text',
  multiline,
  rows,
}: FormInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        type={type}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        multiline={multiline}
        rows={rows}
        error={Boolean(fieldState.error)}
        helperText={fieldState.error?.message}
      />
    )}
  />
)
