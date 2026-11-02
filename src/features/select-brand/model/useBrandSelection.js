import { useDispatch } from 'react-redux'
import { loadOffers } from '../../../entities/part'

export function useBrandSelection(number) {
  const dispatch = useDispatch()

  return (brand) => dispatch(loadOffers({ number, brand }))
}
