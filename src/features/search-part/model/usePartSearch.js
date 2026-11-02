import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSearch,
  loadManufacturers,
  selectSearchState,
} from '../../../entities/part'
import {
  MIN_PART_NUMBER_LENGTH,
  SEARCH_DEBOUNCE_MS,
} from '../../../shared/constants/search'

export function usePartSearch() {
  const dispatch = useDispatch()
  const searchState = useSelector(selectSearchState)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const number = query.trim()
    if (number.length < MIN_PART_NUMBER_LENGTH) return undefined

    let request
    const timer = window.setTimeout(() => {
      request = dispatch(loadManufacturers(number))
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timer)
      request?.abort()
    }
  }, [dispatch, query])

  const changeQuery = (value) => {
    setQuery(value)
    dispatch(clearSearch())
  }

  const clearQuery = () => changeQuery('')

  return {
    query,
    changeQuery,
    clearQuery,
    ...searchState,
  }
}
