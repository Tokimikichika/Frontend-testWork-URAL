import { createSelector } from '@reduxjs/toolkit'

const selectParts = (state) => state.parts

export const selectSearchState = createSelector([selectParts], (parts) => ({
    number: parts.number,
    brands: parts.brands,
    selectedBrand: parts.selectedBrand,
    status: parts.brandsStatus,
    error: parts.brandsError,
}))

export const selectOffersState = createSelector([selectParts], (parts) => ({
    number: parts.number,
    selectedBrand: parts.selectedBrand,
    goods: parts.goods,
    status: parts.offersStatus,
    error: parts.offersError,
}))
