import './EmptyState.css'

export function EmptyState({ children }) {
  return (
    <div className="empty-state" role="status">
      {children}
    </div>
  )
}
