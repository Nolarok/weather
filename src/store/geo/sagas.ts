import { SagaIterator } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import {
  getGeoPosInfo,
  getGeoPosInfoSuccess,
  getGeoPosInfoFail,
} from './actions'

const getLocation = ():Promise<Position> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position)
      },
      (positionError) => {
        reject(positionError)
      }
    )
  })
}

function* SGetGeoPosInfo(): SagaIterator {
  try {
    const response:Position  = yield call(getLocation)

    yield put(getGeoPosInfoSuccess(response))

  } catch (error) {
    console.error(error)
    yield put(getGeoPosInfoFail(error))
  }
}

function* pollingSaga() {
  yield all([
    takeEvery(getGeoPosInfo, SGetGeoPosInfo),
  ])
}

export default pollingSaga
