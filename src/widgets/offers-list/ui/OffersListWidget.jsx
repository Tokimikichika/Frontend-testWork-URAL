import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getOfferRows, selectOffersState } from '../../../entities/part'
import { useBrandSelection } from '../../../features/select-brand'
import { REQUEST_STATUS } from '../../../shared/constants/requestStatus'
import { APP_TEXT } from '../../../shared/constants/text'
import {
  EmptyState,
  ErrorAlert,
  Loader,
  ResultCount,
  StepCard,
} from '../../../shared/ui'
import { OffersTable } from './OffersTable'
import './OffersListWidget.css'

export function OffersListWidget() {
  const {
    number,
    selectedBrand,
    goods,
    status,
    error,
  } = useSelector(selectOffersState)
  const rows = useMemo(() => getOfferRows(goods), [goods])
  const retry = useBrandSelection(number)

  return (
    <StepCard
      step="2"
      title={APP_TEXT.OFFERS.TITLE}
      titleId="results-title"
      disabled={!selectedBrand}
    >
      {!selectedBrand && (
        <p className="text-secondary mb-0">
          {APP_TEXT.OFFERS.INITIAL_HINT}
        </p>
      )}
      {status === REQUEST_STATUS.LOADING && (
        <Loader text={APP_TEXT.OFFERS.LOADING_ARIA} />
      )}
      {status === REQUEST_STATUS.FAILED && (
        <ErrorAlert
          title={APP_TEXT.OFFERS.ERROR_TITLE}
          message={error}
          actionLabel={APP_TEXT.OFFERS.RETRY}
          onAction={() => retry(selectedBrand)}
        />
      )}
      {status === REQUEST_STATUS.SUCCEEDED && rows.length === 0 && (
        <EmptyState>
          {APP_TEXT.OFFERS.EMPTY_RESULT(selectedBrand)}
        </EmptyState>
      )}
      {rows.length > 0 && (
        <>
          <div className="results-heading">
            <div>
              <span className="text-secondary">
                {APP_TEXT.OFFERS.ARTICLE(number)}
              </span>
              <h3>{selectedBrand}</h3>
            </div>
            <ResultCount>{rows.length}</ResultCount>
          </div>
          <OffersTable rows={rows} />
        </>
      )}
    </StepCard>
  )
}
