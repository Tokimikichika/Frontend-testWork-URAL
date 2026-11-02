import { beforeEach, describe, expect, it, vi } from 'vitest'
import { APP_TEXT } from '../../../shared/constants/text'
import { fetchManufacturers, fetchOffers } from './partsApi'

function mockResponse({ ok = true, status = 200, data, body } = {}) {
  return {
    ok,
    status,
    text: vi.fn().mockResolvedValue(
      body === undefined ? JSON.stringify(data) : body,
    ),
  }
}

describe('partsApi', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('requests manufacturers by part number', async () => {
    const goods = [{ goodsID: '1' }]
    fetch.mockResolvedValue(mockResponse({ data: { goods } }))

    await expect(fetchManufacturers('01089')).resolves.toEqual(goods)
    expect(fetch).toHaveBeenCalledWith(
      'https://api.favorit-parts.ru/hs/hsprice/?key=00000000-0000-0000-0000-000000000001&number=01089',
      { signal: expect.any(AbortSignal) },
    )
  })

  it('enables analogues and info for offers request', async () => {
    fetch.mockResolvedValue(mockResponse({ data: { goods: [] } }))

    await fetchOffers('01089', 'FEBI')

    expect(fetch).toHaveBeenCalledWith(
      'https://api.favorit-parts.ru/hs/hsprice/?key=00000000-0000-0000-0000-000000000001&number=01089&brand=FEBI&analogues=on&info=on',
      { signal: expect.any(AbortSignal) },
    )
  })

  it('throws an API error returned in JSON', async () => {
    fetch.mockResolvedValue(mockResponse({ data: { error: ['Bad key'] } }))

    await expect(fetchManufacturers('1')).rejects.toThrow('Bad key')
  })

  it('retries temporary HTTP errors', async () => {
    fetch.mockResolvedValue(mockResponse({ ok: false, status: 503 }))

    await expect(fetchManufacturers('1')).rejects.toThrow('HTTP 503')
    expect(fetch).toHaveBeenCalledTimes(3)
  })

  it('handles malformed JSON and response schema', async () => {
    fetch.mockResolvedValueOnce(mockResponse({ body: '{invalid' }))
    await expect(fetchManufacturers('1')).rejects.toThrow(
      APP_TEXT.API_ERRORS.INVALID_RESPONSE,
    )

    fetch.mockResolvedValueOnce(mockResponse({ data: { goods: {} } }))
    await expect(fetchManufacturers('1')).rejects.toThrow(
      APP_TEXT.API_ERRORS.INVALID_RESPONSE,
    )
  })

  it('treats an empty body and an API empty product as no results', async () => {
    fetch.mockResolvedValueOnce(mockResponse({ body: '' }))
    await expect(fetchManufacturers('1')).resolves.toEqual([])

    fetch.mockResolvedValueOnce(mockResponse({ data: { goods: [{}] } }))
    await expect(fetchManufacturers('1')).resolves.toEqual([])
  })

  it('localizes network errors and retries them', async () => {
    fetch.mockRejectedValue(new TypeError('Failed to fetch'))

    await expect(fetchManufacturers('1')).rejects.toThrow(
      APP_TEXT.API_ERRORS.NETWORK,
    )
    expect(fetch).toHaveBeenCalledTimes(3)
  })

  it('aborts timed out requests after all retry attempts', async () => {
    vi.useFakeTimers()
    fetch.mockImplementation((_url, { signal }) => new Promise(
      (_resolve, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason), {
          once: true,
        })
      },
    ))

    try {
      const request = fetchManufacturers('1')
      const assertion = expect(request).rejects.toThrow(
        APP_TEXT.API_ERRORS.TIMEOUT,
      )

      await vi.runAllTimersAsync()
      await assertion
      expect(fetch).toHaveBeenCalledTimes(3)
    } finally {
      vi.useRealTimers()
    }
  })

  it('does not retry a request cancelled by its caller', async () => {
    const controller = new AbortController()
    fetch.mockImplementation((_url, { signal }) => new Promise(
      (_resolve, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason), {
          once: true,
        })
      },
    ))

    const request = fetchManufacturers('1', controller.signal)
    controller.abort()

    await expect(request).rejects.toHaveProperty('name', 'AbortError')
    expect(fetch).toHaveBeenCalledOnce()
  })
})
