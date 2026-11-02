export function ErrorAlert({ title, message, actionLabel, onAction }) {
  return (
    <div className="alert alert-danger mt-3 mb-0" role="alert">
      <strong>{title}</strong> {message}
      {onAction && (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger ms-2"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
