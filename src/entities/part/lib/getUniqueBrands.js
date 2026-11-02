import { APP_LOCALE } from '../../../shared/constants/localization'

export function getUniqueBrands(goods) {
  return [
    ...new Set(goods.map((item) => item.brand?.trim()).filter(Boolean)),
  ].sort((first, second) => first.localeCompare(second, APP_LOCALE))
}
