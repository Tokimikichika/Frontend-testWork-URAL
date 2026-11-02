import { createAsyncThunk } from '@reduxjs/toolkit'
import { APP_TEXT } from '../../../shared/constants/text'
import { fetchManufacturers, fetchOffers } from '../api/partsApi'
import { PARTS_SLICE_NAME } from '../config/partConstants'
import { getUniqueBrands } from '../lib/getUniqueBrands'

function rejectApiError(error, fallbackMessage, rejectWithValue) {
  if (error.name === 'AbortError') throw error
  return rejectWithValue(error.message || fallbackMessage)
}

export const loadManufacturers = createAsyncThunk(
  `${PARTS_SLICE_NAME}/loadManufacturers`,
  async (number, { signal, rejectWithValue }) => {
    try {
      const goods = await fetchManufacturers(number, signal)
      return { number, brands: getUniqueBrands(goods) }
    } catch (error) {
      return rejectApiError(
        error,
        APP_TEXT.API_ERRORS.MANUFACTURERS,
        rejectWithValue,
      )
    }
  },
)

export const loadOffers = createAsyncThunk(
  `${PARTS_SLICE_NAME}/loadOffers`,
  async ({ number, brand }, { signal, rejectWithValue }) => {
    try {
      const goods = await fetchOffers(number, brand, signal)
      return { goods, brand }
    } catch (error) {
      return rejectApiError(
        error,
        APP_TEXT.API_ERRORS.OFFERS,
        rejectWithValue,
      )
    }
  },
)
