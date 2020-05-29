import { createSelector } from 'reselect'
import { AppState } from '@/store'

const getState = (state: AppState) => state.GeoReducer

export const myCoordsSelector = createSelector(
  getState,
  state => state
)
