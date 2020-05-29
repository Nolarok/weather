import { createReducer } from 'redux-act'

import {
  getGeoPosInfoSuccess,
  getGeoPosInfoFail,
  clearError
} from './actions'

export type TGeo = {
  lon: number | null
  lat: number | null
  error: PositionError | null
}

export const initialState: TGeo = {
  lon: null,
  lat: null,
  error: null
}

const reducer = createReducer<TGeo>({}, initialState)

reducer.on(getGeoPosInfoSuccess, (state, pos: Position) => {
  return {
    lon: pos.coords.longitude,
    lat: pos.coords.latitude,
    error: null
  }
})

reducer.on(getGeoPosInfoFail, (state, error: PositionError) => {
  return {
    lon: null,
    lat: null,
    error
  }
})

reducer.on(clearError, (state) => {
  return {...state, ...{error: null}}
})

export default reducer
