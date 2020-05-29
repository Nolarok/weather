import { createSelector } from 'reselect'
import { AppState } from '@/store'

const getState = (state: AppState) => state.CitiesReducer

export const citiesSelector = createSelector(
  getState,
  state => Object.values(state.cities)
)

export const citiesRequestInfoSelector = createSelector(
  getState,
  state => state.requestInfo
)
