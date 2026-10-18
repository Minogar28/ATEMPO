import { API_URL } from '@src/config/api'
import { getAuthToken, redirectOnUnauthorized } from '@src/helpers/auth'

export class HttpError extends Error {
  readonly status: number
  readonly payload: unknown

  constructor(status: number, payload: unknown) {
    super(`HTTP ${status}`)
    this.name = 'HttpError'
    this.status = status
    this.payload = payload
  }
}

type QueryParams = Record<string, string | number | boolean | undefined>

interface RequestOptions {
  method?: string
  body?: unknown
  params?: QueryParams
  headers?: Record<string, string>
}

const buildUrl = (path: string, params?: QueryParams): string => {
  const url = `${API_URL}${path}`
  if (!params) return url
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value))
  }
  const query = search.toString()
  return query ? `${url}?${query}` : url
}

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const token = getAuthToken()

  const response = await fetch(buildUrl(path, options.params), {
    method: options.method ?? 'GET',
    headers: {
      ...(options.body !== undefined && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  if (response.status === 401) {
    redirectOnUnauthorized()
    throw new HttpError(401, null)
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new HttpError(response.status, payload)
  }

  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

export const http = {
  get: <T>(path: string, params?: QueryParams) => request<T>(path, { params }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
