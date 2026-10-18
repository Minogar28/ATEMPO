import { useCallback, useState } from 'react'

type SetValue<T> = (value: T | ((prev: T) => T)) => void

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] => {
  const [stored, setStored] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value
        try {
          localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // storage lleno o no disponible: el estado en memoria igual se actualiza
        }
        return next
      })
    },
    [key],
  )

  return [stored, setValue]
}
