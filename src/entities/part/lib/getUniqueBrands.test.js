import { describe, expect, it } from 'vitest'
import { getUniqueBrands } from './getUniqueBrands'

describe('getUniqueBrands', () => {
  it('removes empty and duplicate brands and sorts the result', () => {
    const goods = [
      { brand: '  FEBI ' },
      { brand: 'ASAM' },
      { brand: 'FEBI' },
      { brand: '' },
      {},
    ]

    expect(getUniqueBrands(goods)).toEqual(['ASAM', 'FEBI'])
  })

  it('returns an empty array for goods without valid brands', () => {
    expect(getUniqueBrands([{}, { brand: ' ' }])).toEqual([])
  })
})
