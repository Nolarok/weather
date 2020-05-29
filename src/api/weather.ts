import { axiosInstance } from '@/api/axios'
import { AxiosResponse } from 'axios'
import { TCoord, TWeatherResponse } from './types'
import { API_KEY } from '@/constants'


export class WeatherApi {
  static get(params: TCoord): Promise<AxiosResponse<TWeatherResponse>> {
    return axiosInstance.get('weather', { params: {...params, ...{appid: API_KEY} }})
  }
}
