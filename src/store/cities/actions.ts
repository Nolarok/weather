import { createAction } from 'redux-act'
import { TCity } from '@/store/cities/types'
import { createAsyncAction } from '@/helpers/actions'
import { TWeatherResponse } from '@/api/types'
import { TRequestStatus } from '@/types'

export const [
  getWeatherInfo,
  getWeatherInfoSuccess,
  getWeatherInfoFail,
] = createAsyncAction<TCity, {name: string, weather: TWeatherResponse}>('@@WEATHER/FETCH')

export const addCity = createAction<TCity>('@@CITY/ADD')
export const deleteCity = createAction<TCity>('@@CITY/DELETE')
export const setRequestInfo = createAction<{status: TRequestStatus, message: string}>('@@CITY/SET_REQUEST_INFO')
