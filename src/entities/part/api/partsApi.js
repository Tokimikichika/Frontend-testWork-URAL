import {
  API_REQUEST_TIMEOUT_MS,
  API_RETRY_BASE_DELAY_MS,
  API_RETRY_COUNT,
  PARTS_API_KEY,
  PARTS_API_URL,
  RETRIABLE_HTTP_STATUSES,
} from '../../../shared/config/api'
import { APP_TEXT } from '../../../shared/constants/text'
import { API_FLAGS } from '../config/partConstants'

class PartsApiError extends Error {
  constructor(message, retryable = false) {
    super(message)
    this.name = 'PartsApiError'
    this.retryable = retryable
  }
}

function createAbortError() {
  return new DOMException('Aborted', 'AbortError')
}

function createRequestAbortContext(externalSignal) {
  const controller = new AbortController()
  let timedOut = false

  const abortFromExternalSignal = () => {
    controller.abort(externalSignal?.reason || createAbortError())
  }

  externalSignal?.addEventListener('abort', abortFromExternalSignal, {
    once: true,
  })

  const timeoutId = window.setTimeout(() => {
    timedOut = true
    controller.abort(createAbortError())
  }, API_REQUEST_TIMEOUT_MS)

  return {
    signal: controller.signal,
    didTimeOut: () => timedOut,
    cleanup: () => {
      window.clearTimeout(timeoutId)
      externalSignal?.removeEventListener('abort', abortFromExternalSignal)
    },
  }
}

function waitForRetry(delay, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason || createAbortError())
      return
    }

    const onAbort = () => {
      window.clearTimeout(timeoutId)
      reject(signal.reason || createAbortError())
    }
    const timeoutId = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, delay)

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function normalizeProduct(product) {
  if (!isRecord(product)) {
    throw new PartsApiError(APP_TEXT.API_ERRORS.INVALID_RESPONSE)
  }

  if (Object.keys(product).length === 0) return null

  if (product.warehouses !== undefined) {
    if (
      !Array.isArray(product.warehouses) ||
      product.warehouses.some((warehouse) => !isRecord(warehouse))
    ) {
      throw new PartsApiError(APP_TEXT.API_ERRORS.INVALID_RESPONSE)
    }
  }

  if (product.analogues !== undefined) {
    if (!Array.isArray(product.analogues)) {
      throw new PartsApiError(APP_TEXT.API_ERRORS.INVALID_RESPONSE)
    }

    return {
      ...product,
      analogues: product.analogues.map(normalizeProduct).filter(Boolean),
    }
  }

  return product
}

function normalizeApiError(error) {
  if (Array.isArray(error)) return error.map(String).join(', ')
  if (typeof error === 'string') return error
  return JSON.stringify(error)
}

function parseResponseBody(body) {
  if (!body.trim()) return []

  let data
  try {
    data = JSON.parse(body)
  } catch {
    throw new PartsApiError(APP_TEXT.API_ERRORS.INVALID_RESPONSE)
  }

  if (!isRecord(data)) {
    throw new PartsApiError(APP_TEXT.API_ERRORS.INVALID_RESPONSE)
  }

  if (data.error) {
    throw new PartsApiError(normalizeApiError(data.error))
  }

  if (!Array.isArray(data.goods)) {
    throw new PartsApiError(APP_TEXT.API_ERRORS.INVALID_RESPONSE)
  }

  return data.goods.map(normalizeProduct).filter(Boolean)
}

async function requestOnce(url, externalSignal) {
  const abortContext = createRequestAbortContext(externalSignal)

  try {
    const response = await fetch(url, { signal: abortContext.signal })

    if (!response.ok) {
      const retryable = RETRIABLE_HTTP_STATUSES.includes(response.status)
      throw new PartsApiError(
        `${APP_TEXT.API_ERRORS.UNAVAILABLE} (HTTP ${response.status})`,
        retryable,
      )
    }

    return parseResponseBody(await response.text())
  } catch (error) {
    if (externalSignal?.aborted) throw error

    if (abortContext.didTimeOut()) {
      throw new PartsApiError(APP_TEXT.API_ERRORS.TIMEOUT, true)
    }

    if (error instanceof PartsApiError) throw error

    throw new PartsApiError(APP_TEXT.API_ERRORS.NETWORK, true)
  } finally {
    abortContext.cleanup()
  }
}

async function requestParts(params, signal) {
  const query = new URLSearchParams({
    key: PARTS_API_KEY,
    ...params,
  })
  const url = `${PARTS_API_URL}?${query}`

  for (let attempt = 0; attempt <= API_RETRY_COUNT; attempt += 1) {
    try {
      return await requestOnce(url, signal)
    } catch (error) {
      const canRetry = error.retryable && attempt < API_RETRY_COUNT
      if (!canRetry) throw error

      await waitForRetry(
        API_RETRY_BASE_DELAY_MS * (2 ** attempt),
        signal,
      )
    }
  }

  return []
}

export function fetchManufacturers(number, signal) {
  return requestParts({ number }, signal)
}

export function fetchOffers(number, brand, signal) {
  return requestParts(
    {
      number,
      brand,
      analogues: API_FLAGS.ENABLED,
      info: API_FLAGS.ENABLED,
    },
    signal,
  )
}
