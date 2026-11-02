export const PARTS_API_URL =
  import.meta.env.VITE_API_URL || '/api/parts'

export const API_REQUEST_TIMEOUT_MS = 10_000
export const API_RETRY_COUNT = 2
export const API_RETRY_BASE_DELAY_MS = 300

export const RETRIABLE_HTTP_STATUSES = Object.freeze([
  429,
  500,
  502,
  503,
  504,
])
