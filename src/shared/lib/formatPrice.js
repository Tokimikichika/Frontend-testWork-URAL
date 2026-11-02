import {
  APP_LOCALE,
  EMPTY_VALUE,
  PRICE_CURRENCY,
} from '../constants/localization'

const priceFormatter = new Intl.NumberFormat(APP_LOCALE, {
  style: 'currency',
  currency: PRICE_CURRENCY,
  maximumFractionDigits: 2,
})

export function formatPrice(price) {
  return price === null ? EMPTY_VALUE : priceFormatter.format(price)
}
