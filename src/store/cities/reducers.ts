import { createReducer } from 'redux-act'

import { TCity } from '@/store/cities/types'
import { addCity, deleteCity, getWeatherInfoSuccess, setRequestInfo } from '@/store/cities/actions'
import { TWeatherResponse } from '@/api/types'
import { RequestStatus, TRequestStatus } from '@/types'
import { KelvinToDegree, normalizeDate } from '@/helpers/convert'


export type TCitiesState = {
  cities: { [name: string]: TCity },
  requestInfo: {
    status: TRequestStatus
    message: string
  }
}

export const initialState: TCitiesState = {
  cities: {
    'Cherepovets': {
      name: 'Cherepovets',
      coord: {lon: 37.9248626, lat: 59.1270481}
    }
  },
  requestInfo: {
    status: RequestStatus.DEFAULT,
    message: ''
  }
}

const reducer = createReducer<TCitiesState>({}, initialState)

reducer.on(addCity, (state, city: TCity) => {
  let { name } = city

  let i = 1
  // добавление постфикса для неуникальных имен
  while (state.cities.hasOwnProperty(name)) {
    name = city.name + `-${i++}`
  }

  const _state = { ...state }

  _state.cities = {
    ..._state.cities,
    ...{ [name]: { ...city, name } }
  }

  return _state
})

reducer.on(getWeatherInfoSuccess, (state, payload: { name: string, weather: TWeatherResponse }) => {
  const { weather, name } = payload

  weather.main.feels_like = KelvinToDegree(weather.main.feels_like)
  weather.main.temp = KelvinToDegree(weather.main.temp)
  weather.main.temp_max = KelvinToDegree(weather.main.temp_max)
  weather.main.temp_min = KelvinToDegree(weather.main.temp_min)

  weather.dt = normalizeDate(weather.dt)
  weather.sys.sunrise = normalizeDate(weather.sys.sunrise)
  weather.sys.sunset = normalizeDate(weather.sys.sunset)

  const _state = { ...state }

  _state.cities = {
    ..._state.cities,
    ...{ [name]: { ...state.cities[name], weather } }
  }

  return _state
})

reducer.on(deleteCity, (state, city: TCity) => {
  const _state = { ...state }

  delete _state.cities[city.name]

  return _state
})

reducer.on(setRequestInfo, (state, requestInfo: { status: TRequestStatus, message: string }) => {
  const { message, status } = requestInfo

  return {
    ...state,
    ...{ requestInfo: { status, message } }
  }
})

export default reducer
