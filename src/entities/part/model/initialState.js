import { REQUEST_STATUS } from '../../../shared/constants/requestStatus'

export const initialPartsState = {
  number: '',
  brands: [],
  selectedBrand: '',
  goods: [],
  brandsStatus: REQUEST_STATUS.IDLE,
  offersStatus: REQUEST_STATUS.IDLE,
  brandsError: null,
  offersError: null,
  brandsRequestId: null,
  offersRequestId: null,
}
