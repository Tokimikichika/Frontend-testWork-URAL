import { configureStore } from '@reduxjs/toolkit'
import { partsReducer } from '../entities/part'
import { REDUX_CHECK_WARN_AFTER_MS } from '../shared/constants/performance'

export const store = configureStore({
  reducer: {
    parts: partsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: REDUX_CHECK_WARN_AFTER_MS,
      },
    }),
})
