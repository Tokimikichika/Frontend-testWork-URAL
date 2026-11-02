import { AppHeader } from '../../../widgets/app-header'
import { OffersListWidget } from '../../../widgets/offers-list'
import { PartSearchWidget } from '../../../widgets/part-search'
import './PartsSearchPage.css'

export function PartsSearchPage() {
  return (
    <main>
      <AppHeader />
      <div className="container content-wrap">
        <PartSearchWidget />
        <OffersListWidget />
      </div>
    </main>
  )
}
