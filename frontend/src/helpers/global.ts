type PlainObject = Record<string, unknown>

const isPlainObject = (value: unknown): value is PlainObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export function deepMergeObjects<T>(...objects: unknown[]): T {
  const result: PlainObject = {}

  for (const source of objects) {
    if (!isPlainObject(source)) continue
    for (const [key, value] of Object.entries(source)) {
      const current = result[key]
      result[key] =
        isPlainObject(current) && isPlainObject(value)
          ? deepMergeObjects(current, value)
          : value
    }
  }

  return result as T
}
