import { EMPTY_VALUE } from '../../../shared/constants/localization'
import { APP_TEXT } from '../../../shared/constants/text'

function getProductsWithAnalogues(goods) {
  return goods.flatMap((item) => [
    item,
    ...(Array.isArray(item.analogues) ? item.analogues : []),
  ])
}

function createWarehouseRow(product, warehouse) {
  const price = Number(warehouse.price)

  return {
    ...product,
    warehouse: warehouse.code || warehouse.id || APP_TEXT.DEFAULTS.WAREHOUSE,
    stock: Number(warehouse.stock) || 0,
    warehousePrice: Number.isFinite(price) ? price : null,
    notRefund: Boolean(product.notRefund || warehouse.notRefund),
  }
}

function createProductRow(product) {
  return {
    ...product,
    warehouse: EMPTY_VALUE,
    stock: Number(product.count) || 0,
    warehousePrice: null,
    notRefund: Boolean(product.notRefund),
  }
}

export function getOfferRowKey(row) {
  return `${row.goodsID}-${row.brand}-${row.number}-${row.warehouse}`
}

export function getOfferRows(goods) {
  const rows = getProductsWithAnalogues(goods).flatMap((product) => {
    const warehouses = Array.isArray(product.warehouses)
      ? product.warehouses
      : []

    return warehouses.length
      ? warehouses.map((warehouse) => createWarehouseRow(product, warehouse))
      : [createProductRow(product)]
  })

  return [...new Map(
    rows.map((row) => [getOfferRowKey(row), row]),
  ).values()]
}
