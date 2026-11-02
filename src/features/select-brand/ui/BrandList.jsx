import { APP_TEXT } from '../../../shared/constants/text'
import { ResultCount } from '../../../shared/ui'
import './BrandList.css'

export function BrandList({ brands, selectedBrand, onSelect }) {
  return (
    <div className="brands-block">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
        <h3 className="h6 mb-0">{APP_TEXT.BRANDS.TITLE}</h3>
        <ResultCount>{brands.length}</ResultCount>
      </div>
      <div className="brand-list">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            className={`brand-button ${
              selectedBrand === brand ? 'active' : ''
            }`}
            onClick={() => onSelect(brand)}
            aria-pressed={selectedBrand === brand}
          >
            {brand}
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
