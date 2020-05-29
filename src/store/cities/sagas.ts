import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { AxiosResponse } from 'axios'
import { getWeatherInfo, getWeatherInfoSuccess, setRequestInfo, } from '@/store/cities/actions'
import { WeatherApi } from '@/api/weather'
import { RequestStatus } from '@/types'
import { TWeatherResponse } from '@/api/types'

function* SGetWeatherInfo({ payload }: any): SagaIterator {
  try {
    yield put(setRequestInfo({ status: RequestStatus.PENDING, message: '' }))
    const response: AxiosResponse<TWeatherResponse> = yield call(WeatherApi.get, payload.coord)

    if (response.data.cod !== 200) {
      yield put(setRequestInfo({ status: RequestStatus.FAILED, message: response.data.message || 'Server error' }))
    }

    yield put(setRequestInfo({ status: RequestStatus.SUCCESS, message: '' }))
    yield put(getWeatherInfoSuccess({ name: payload.name, weather: response.data }))

  } catch (error) {
    console.error(error)
    yield put(setRequestInfo({ status: RequestStatus.FAILED, message: 'Server error' }))
  }
}

function* pollingSaga() {
  yield all([
    takeEvery(getWeatherInfo, SGetWeatherInfo),
  ])
}

export default pollingSaga
