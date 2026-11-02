import { getOfferRowKey } from '../../../entities/part'
import { APP_TEXT } from '../../../shared/constants/text'
import { OfferTableRow } from './OfferTableRow'

export function OffersTable({ rows }) {
  return (
    <div className="table-responsive">
      <table className="table offers-table align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">{APP_TEXT.TABLE.NAME_AND_BRAND}</th>
            <th scope="col">{APP_TEXT.TABLE.ARTICLE}</th>
            <th scope="col">{APP_TEXT.TABLE.WAREHOUSE}</th>
            <th scope="col" className="text-end">
              {APP_TEXT.TABLE.STOCK}
            </th>
            <th scope="col" className="text-end">
              {APP_TEXT.TABLE.PRICE}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <OfferTableRow key={getOfferRowKey(row)} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
