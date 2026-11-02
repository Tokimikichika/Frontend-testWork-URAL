import { REQUEST_STATUS } from '../../../shared/constants/requestStatus'
import { APP_TEXT } from '../../../shared/constants/text'
import { loadManufacturers, loadOffers } from './partsThunks'

function isCurrentRequest(currentId, action) {
  return currentId === action.meta.requestId
}

export function addPartsExtraReducers(builder) {
  builder
    .addCase(loadManufacturers.pending, (state, action) => {
      state.number = action.meta.arg
      state.brands = []
      state.selectedBrand = ''
      state.goods = []
      state.brandsStatus = REQUEST_STATUS.LOADING
      state.offersStatus = REQUEST_STATUS.IDLE
      state.brandsError = null
      state.offersError = null
      state.brandsRequestId = action.meta.requestId
    })
    .addCase(loadManufacturers.fulfilled, (state, action) => {
      if (!isCurrentRequest(state.brandsRequestId, action)) return
      state.brands = action.payload.brands
      state.brandsStatus = REQUEST_STATUS.SUCCEEDED
      state.brandsRequestId = null
    })
    .addCase(loadManufacturers.rejected, (state, action) => {
      if (!isCurrentRequest(state.brandsRequestId, action)) return
      state.brandsStatus = action.meta.aborted
        ? REQUEST_STATUS.IDLE
        : REQUEST_STATUS.FAILED
      state.brandsError = action.meta.aborted
        ? null
        : action.payload || APP_TEXT.API_ERRORS.MANUFACTURERS
      state.brandsRequestId = null
    })
    .addCase(loadOffers.pending, (state, action) => {
      state.selectedBrand = action.meta.arg.brand
      state.goods = []
      state.offersStatus = REQUEST_STATUS.LOADING
      state.offersError = null
      state.offersRequestId = action.meta.requestId
    })
    .addCase(loadOffers.fulfilled, (state, action) => {
      if (!isCurrentRequest(state.offersRequestId, action)) return
      state.goods = action.payload.goods
      state.offersStatus = REQUEST_STATUS.SUCCEEDED
      state.offersRequestId = null
    })
    .addCase(loadOffers.rejected, (state, action) => {
      if (!isCurrentRequest(state.offersRequestId, action)) return
      state.offersStatus = action.meta.aborted
        ? REQUEST_STATUS.IDLE
        : REQUEST_STATUS.FAILED
      state.offersError = action.meta.aborted
        ? null
        : action.payload || APP_TEXT.API_ERRORS.OFFERS
      state.offersRequestId = null
    })
}
