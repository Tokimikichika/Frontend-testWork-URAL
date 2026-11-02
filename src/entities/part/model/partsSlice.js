import { createSlice } from '@reduxjs/toolkit'
import { PARTS_SLICE_NAME } from '../config/partConstants'
import { initialPartsState } from './initialState'
import { addPartsExtraReducers } from './partsExtraReducers'

const partsSlice = createSlice({
  name: PARTS_SLICE_NAME,
  initialState: initialPartsState,
  reducers: {
    clearSearch: () => ({ ...initialPartsState }),
  },
  extraReducers: addPartsExtraReducers,
})

export const { clearSearch } = partsSlice.actions
export const partsReducer = partsSlice.reducer
