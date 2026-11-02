import './Loader.css'

export function Loader({ text }) {
  return (
    <div className="loader" role="status">
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      />
      <span>{text}</span>
    </div>
  )
}
