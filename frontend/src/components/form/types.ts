import type { Control, ControllerProps, FieldValues } from 'react-hook-form'

// Props base de cualquier input controlado por react-hook-form.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ControlledInputProps<T extends FieldValues = any> {
  name: ControllerProps<T>['name']
  control: Control<T>
  label?: string
  placeholder?: string
  rules?: ControllerProps<T>['rules']
  disabled?: boolean
  autoComplete?: string
}

export interface SelectOption {
  value: string | number
  label: string
}
