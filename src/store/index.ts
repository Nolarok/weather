import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

import { TGeo } from '@/store/geo/reducers'
import { TCitiesState } from '@/store/cities/reducers'
import { loadState, saveState } from '@/store/localStorage'



export default function makeStore() {
  const sagaMiddleware = createSagaMiddleware()

  const persistedState = loadState()

  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  const storeWithSaga = {
    ...store,
    sagaTask: sagaMiddleware.run(rootSaga),
  }

  storeWithSaga.subscribe(
    throttle(() => {
      saveState({CitiesReducer: store.getState().CitiesReducer})
    }, 1000)
  )

  return storeWithSaga
}

export type AppState = {
  CitiesReducer: TCitiesState
  GeoReducer: TGeo
}
