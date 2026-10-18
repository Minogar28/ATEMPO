import { Controller } from 'react-hook-form'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import type { FieldValues } from 'react-hook-form'
import type { ControlledInputProps, SelectOption } from './types'

interface SelectInputProps<T extends FieldValues>
  extends ControlledInputProps<T> {
  options: SelectOption[]
}

export const SelectInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  disabled,
  options,
}: SelectInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        select
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        error={Boolean(fieldState.error)}
        helperText={fieldState.error?.message}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
)
