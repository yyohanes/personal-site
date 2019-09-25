import { all, takeLatest, call, put } from 'redux-saga/effects'
import { Entry } from 'contentful'

import Api from 'app/infrastructure/utils/Api'
import HomeActions from './actions'
import {
  convertToBlockModel,
  convertToProfessionalExperienceModel,
  convertToStaticPageModel,
} from 'app/infrastructure/utils/Contentful'

function * requestData () {
  const homeStaticPageResponse = yield call(Api.getContentfulEntryByField, 'staticPage', 'slug', 'home')
  const aboutBlockResponse = yield call(Api.getContentfulEntryByField, 'block', 'slug', 'about')
  const generalInfoBlockResponse = yield call(Api.getContentfulEntryByField, 'block', 'slug', 'general-information')
  const professionalExperiencesResponse = yield call(Api.getContentfulEntries, 'professionalExperience', undefined, '-fields.dateFrom')

  yield put(HomeActions.setData({
    homeStaticPage: convertToStaticPageModel(homeStaticPageResponse.data),
    aboutBlock: convertToBlockModel(aboutBlockResponse.data),
    generalInformationBlock: convertToBlockModel(generalInfoBlockResponse.data),
    professionalExperiences: professionalExperiencesResponse.data.items.map(
      (professionalExperience: Entry<any>) =>
        convertToProfessionalExperienceModel(professionalExperience)
    ),
  }))
}

export default function * () {
  yield all([
    takeLatest(HomeActions.requestData.TYPE, requestData)
  ])
}
