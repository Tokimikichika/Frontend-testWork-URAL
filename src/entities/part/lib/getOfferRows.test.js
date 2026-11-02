import { describe, expect, it } from 'vitest'
import { EMPTY_VALUE } from '../../../shared/constants/localization'
import { getOfferRowKey, getOfferRows } from './getOfferRows'

describe('getOfferRows', () => {
  it('creates a row for every warehouse and nested analogue', () => {
    const goods = [{
      goodsID: 'main',
      brand: 'FEBI',
      number: '01089',
      warehouses: [
        { id: '1', code: 'MSK', stock: 3, price: 100 },
        { id: '2', stock: 2, price: 120, notRefund: true },
      ],
      analogues: [{
        goodsID: 'analogue',
        brand: 'ASAM',
        number: 'A-1',
        warehouses: [{ id: '3', code: 'SPB', stock: 1, price: 90 }],
      }],
    }]

    const rows = getOfferRows(goods)

    expect(rows).toHaveLength(3)
    expect(rows[0]).toMatchObject({
      warehouse: 'MSK',
      stock: 3,
      warehousePrice: 100,
      notRefund: false,
    })
    expect(rows[1].notRefund).toBe(true)
    expect(rows[2]).toMatchObject({
      goodsID: 'analogue',
      warehouse: 'SPB',
      warehousePrice: 90,
    })
  })

  it('uses product stock and no price when warehouses are absent', () => {
    const [row] = getOfferRows([{
      goodsID: 'empty',
      brand: 'AP',
      number: '1',
      count: 4,
      warehouses: [],
    }])

    expect(row).toMatchObject({
      warehouse: EMPTY_VALUE,
      stock: 4,
      warehousePrice: null,
    })
  })

  it('deduplicates equal offer rows', () => {
    const product = {
      goodsID: 'same',
      brand: 'FEBI',
      number: '1',
      warehouses: [{ code: 'MSK', stock: 1, price: 10 }],
    }

    expect(getOfferRows([product, product])).toHaveLength(1)
  })
})

describe('getOfferRowKey', () => {
  it('builds a stable key from offer properties', () => {
    expect(getOfferRowKey({
      goodsID: 'id',
      brand: 'brand',
      number: 'number',
      warehouse: 'warehouse',
    })).toBe('id-brand-number-warehouse')
  })
})
