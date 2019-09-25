import { all, takeLatest, call, put } from 'redux-saga/effects'

import Api from 'app/infrastructure/utils/Api'
import AppActions from './actions'
import { convertToBlockModel } from 'app/infrastructure/utils/Contentful'

function * appStartup () {
  yield put(AppActions.requestBootData())
}

function * requestBootData () {
  const headerBlockResponse = yield call(Api.getContentfulEntryByField, 'block', 'slug', 'header')
  const footerBlockResponse = yield call(Api.getContentfulEntryByField, 'block', 'slug', 'footer')

  if (headerBlockResponse.ok) {
    yield put(AppActions.setBootData({
      headerBlock: convertToBlockModel(headerBlockResponse.data),
      footerBlock: convertToBlockModel(footerBlockResponse.data),
    }))
  }
}

export default function * () {
  yield all([
    takeLatest(AppActions.appStartup.TYPE, appStartup),
    takeLatest(AppActions.requestBootData.TYPE, requestBootData)
  ])
}
