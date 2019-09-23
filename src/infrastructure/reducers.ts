import { combineReducers, Reducer } from 'redux'

import appReducer, { AppState } from './App/reducer'
import homeReducer, { HomeState } from './Home/reducer'

export type State = {
  app: AppState;
  home: HomeState;
}

export default combineReducers<State>({
  app: appReducer as Reducer<AppState>,
  home: homeReducer as Reducer<HomeState>,
})
