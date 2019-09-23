import { all, takeLatest, call, put } from 'redux-saga/effects'

import Api from 'app/infrastructure/utils/Api'
import AppActions from './actions'
import { convertToBlockModel } from 'app/infrastructure/utils/Contentful'

function * appStartup () {
  yield put(AppActions.requestBootData())
}

function * requestBootData () {
  const logoBlockResponse = yield call(Api.getContentfulEntryByField, 'block', 'slug', 'logo-text')
  const footerBlockResponse = yield call(Api.getContentfulEntryByField, 'block', 'slug', 'footer')

  if (logoBlockResponse.ok) {
    yield put(AppActions.setBootData({
      logoBlock: convertToBlockModel(logoBlockResponse.data),
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
