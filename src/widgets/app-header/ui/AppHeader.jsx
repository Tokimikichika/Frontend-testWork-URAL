import { APP_TEXT } from '../../../shared/constants/text'
import './AppHeader.css'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="container py-4 py-lg-5">
        <span className="eyebrow">{APP_TEXT.HEADER.EYEBROW}</span>
        <h1>{APP_TEXT.HEADER.TITLE}</h1>
        <p className="header-copy">{APP_TEXT.HEADER.DESCRIPTION}</p>
      </div>
    </header>
  )
}
