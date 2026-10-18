import { Controller } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import type { FieldValues } from 'react-hook-form'
import type { ControlledInputProps } from './types'

export const CheckboxInput = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  disabled,
}: ControlledInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <>
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={Boolean(field.value)}
              disabled={disabled}
            />
          }
          label={label}
        />
        {fieldState.error && (
          <FormHelperText error>{fieldState.error.message}</FormHelperText>
        )}
      </>
    )}
  />
)
