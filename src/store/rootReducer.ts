import { combineReducers } from 'redux'
import CitiesReducer from '@/store/cities/reducers'
import GeoReducer from '@/store/geo/reducers'

export default combineReducers({
  CitiesReducer,
  GeoReducer
})
