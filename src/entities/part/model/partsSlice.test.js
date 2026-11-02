import { describe, expect, it } from 'vitest'
import { REQUEST_STATUS } from '../../../shared/constants/requestStatus'
import { initialPartsState } from './initialState'
import { clearSearch, partsReducer } from './partsSlice'
import { loadManufacturers, loadOffers } from './partsThunks'

describe('partsReducer', () => {
  it('tracks manufacturers request lifecycle', () => {
    const pendingState = partsReducer(
      initialPartsState,
      loadManufacturers.pending('request-1', '01089'),
    )

    expect(pendingState).toMatchObject({
      number: '01089',
      brandsStatus: REQUEST_STATUS.LOADING,
      brandsRequestId: 'request-1',
    })

    const fulfilledState = partsReducer(
      pendingState,
      loadManufacturers.fulfilled(
        { number: '01089', brands: ['ASAM', 'FEBI'] },
        'request-1',
        '01089',
      ),
    )

    expect(fulfilledState).toMatchObject({
      brands: ['ASAM', 'FEBI'],
      brandsStatus: REQUEST_STATUS.SUCCEEDED,
      brandsRequestId: null,
    })
  })

  it('ignores a stale manufacturers response', () => {
    const state = {
      ...initialPartsState,
      brandsStatus: REQUEST_STATUS.LOADING,
      brandsRequestId: 'current-request',
    }

    const result = partsReducer(
      state,
      loadManufacturers.fulfilled(
        { number: 'old', brands: ['OLD'] },
        'stale-request',
        'old',
      ),
    )

    expect(result).toEqual(state)
  })

  it('stores selected brand and offers', () => {
    const pendingState = partsReducer(
      initialPartsState,
      loadOffers.pending('offers-request', {
        number: '01089',
        brand: 'FEBI',
      }),
    )
    const goods = [{ goodsID: '1' }]
    const result = partsReducer(
      pendingState,
      loadOffers.fulfilled(
        { goods, brand: 'FEBI' },
        'offers-request',
        { number: '01089', brand: 'FEBI' },
      ),
    )

    expect(result).toMatchObject({
      selectedBrand: 'FEBI',
      goods,
      offersStatus: REQUEST_STATUS.SUCCEEDED,
    })
  })

  it('clears all search state', () => {
    const populatedState = {
      ...initialPartsState,
      number: '01089',
      brands: ['FEBI'],
      selectedBrand: 'FEBI',
    }

    expect(partsReducer(populatedState, clearSearch())).toEqual(
      initialPartsState,
    )
  })
})
