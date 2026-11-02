import { MIN_PART_NUMBER_LENGTH } from '../../../shared/constants/search'
import { APP_TEXT } from '../../../shared/constants/text'

export function PartNumberInput({
  value,
  onChange,
  onClear,
  disabled = false,
}) {
  const showHint = value.length > 0 && value.length < MIN_PART_NUMBER_LENGTH

  return (
    <>
      <label className="form-label fw-semibold" htmlFor="part-number">
        {APP_TEXT.SEARCH.LABEL}
      </label>
      <div className="input-group input-group-lg">
        <span className="input-group-text" aria-hidden="true">#</span>
        <input
          id="part-number"
          className="form-control"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={APP_TEXT.SEARCH.PLACEHOLDER}
          autoComplete="off"
          disabled={disabled}
          autoFocus
        />
        {value && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onClear}
            aria-label={APP_TEXT.SEARCH.CLEAR_ARIA}
          >
            {APP_TEXT.SEARCH.CLEAR}
          </button>
        )}
      </div>
      {showHint && (
        <div className="form-text">
          {APP_TEXT.SEARCH.MIN_LENGTH_HINT(MIN_PART_NUMBER_LENGTH)}
        </div>
      )}
    </>
  )
}
