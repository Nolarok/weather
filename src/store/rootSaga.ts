import { call, all } from 'redux-saga/effects'
import citiesSaga from '@/store/cities/sagas'
import geoSaga from '@/store/geo/sagas'


export default function*() {
  return yield all([
    call(citiesSaga),
    call(geoSaga)
  ])
}
