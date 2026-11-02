import { useBrandSelection, BrandList } from '../../../features/select-brand'
import { PartNumberInput, usePartSearch } from '../../../features/search-part'
import { REQUEST_STATUS } from '../../../shared/constants/requestStatus'
import { APP_TEXT } from '../../../shared/constants/text'
import { EmptyState, ErrorAlert, Loader, StepCard } from '../../../shared/ui'
import './PartSearchWidget.css'

export function PartSearchWidget() {
  const {
    query,
    changeQuery,
    clearQuery,
    number,
    brands,
    selectedBrand,
    status,
    error,
  } = usePartSearch()
  const selectBrand = useBrandSelection(number)

  return (
    <StepCard step="1" title={APP_TEXT.SEARCH.TITLE} titleId="search-title">
      <p className="text-secondary mb-3">
        {APP_TEXT.SEARCH.DESCRIPTION}
      </p>
      <PartNumberInput
        value={query}
        onChange={changeQuery}
        onClear={clearQuery}
      />

      {status === REQUEST_STATUS.LOADING && (
        <Loader text={APP_TEXT.SEARCH.LOADING_ARIA} />
      )}
      {status === REQUEST_STATUS.FAILED && (
        <ErrorAlert
          title={APP_TEXT.SEARCH.ERROR_TITLE}
          message={error}
        />
      )}
      {status === REQUEST_STATUS.SUCCEEDED && brands.length === 0 && (
        <EmptyState>
          {APP_TEXT.SEARCH.EMPTY_RESULT(number)}
        </EmptyState>
      )}
      {brands.length > 0 && (
        <BrandList
          brands={brands}
          selectedBrand={selectedBrand}
          onSelect={selectBrand}
        />
      )}
    </StepCard>
  )
}
