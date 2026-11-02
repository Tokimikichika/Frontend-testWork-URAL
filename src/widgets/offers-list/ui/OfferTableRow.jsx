import { EMPTY_VALUE } from '../../../shared/constants/localization'
import { APP_TEXT } from '../../../shared/constants/text'
import { formatPrice } from '../../../shared/lib/formatPrice'

export function OfferTableRow({ row }) {
  return (
    <tr>
      <td>
        <strong>{row.name || APP_TEXT.TABLE.UNNAMED}</strong>
        <div className="brand-name">{row.brand || EMPTY_VALUE}</div>
        {row.notRefund && (
          <span className="badge text-bg-warning mt-1">
            {APP_TEXT.TABLE.NON_REFUNDABLE}
          </span>
        )}
      </td>
      <td>{row.number || EMPTY_VALUE}</td>
      <td>{row.warehouse}</td>
      <td className="text-end">
        <span className={row.stock > 0 ? 'stock' : 'no-stock'}>
          {APP_TEXT.TABLE.QUANTITY(row.stock)}
        </span>
      </td>
      <td className="text-end price">
        {formatPrice(row.warehousePrice)}
      </td>
    </tr>
  )
}
