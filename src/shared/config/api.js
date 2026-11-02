const PUBLIC_DEMO_API_URL =
  'https://api.favorit-parts.ru/hs/hsprice/'
const PUBLIC_DEMO_API_KEY =
  '00000000-0000-0000-0000-000000000001'

export const PARTS_API_URL =
  import.meta.env.VITE_API_URL || PUBLIC_DEMO_API_URL
export const PARTS_API_KEY =
  import.meta.env.VITE_FAVORIT_API_KEY || PUBLIC_DEMO_API_KEY

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
