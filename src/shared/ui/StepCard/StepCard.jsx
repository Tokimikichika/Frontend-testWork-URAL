import './StepCard.css'

export function StepCard({
  step,
  title,
  titleId,
  disabled = false,
  className = '',
  children,
}) {
  return (
    <section
      className={`step-card ${disabled ? 'is-disabled' : ''} ${className}`}
      aria-labelledby={titleId}
    >
      <div className="step-badge">{step}</div>
      <div className="step-content">
        <h2 id={titleId}>{title}</h2>
        {children}
      </div>
    </section>
  )
}
