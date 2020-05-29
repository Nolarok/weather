import { TCoord, TWeatherResponse } from '@/api/types'

export type TCity = {
  name: string,
  coord: TCoord,
  weather?: TWeatherResponse
}
