import { createAction } from 'redux-act'
import { createAsyncAction } from '@/helpers/actions'

export const [
  getGeoPosInfo,
  getGeoPosInfoSuccess,
  getGeoPosInfoFail,

] = createAsyncAction<Position, PositionError>('@@MY_GEO/FETCH', true)

export const clearError = createAction('@@MY_GEO/CLEAR_ERROR')
