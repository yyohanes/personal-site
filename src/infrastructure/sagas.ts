import { all, fork } from 'redux-saga/effects'

import AppSaga from 'app/infrastructure/App/saga'
import HomeSaga from 'app/infrastructure/Home/saga'

export default function * root () {
  yield all([
    fork(AppSaga),
    fork(HomeSaga),
  ])
}
