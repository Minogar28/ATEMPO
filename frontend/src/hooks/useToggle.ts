import { useCallback, useState } from 'react'

interface ToggleHandlers {
  toggle: () => void
  setOn: () => void
  setOff: () => void
  set: (value: boolean) => void
}

export const useToggle = (initial = false): [boolean, ToggleHandlers] => {
  const [value, setValue] = useState(initial)

  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const setOn = useCallback(() => setValue(true), [])
  const setOff = useCallback(() => setValue(false), [])
  const set = useCallback((next: boolean) => setValue(next), [])

  return [value, { toggle, setOn, setOff, set }]
}
