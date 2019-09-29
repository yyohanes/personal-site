import makeActionCreatorFactory from 'app/infrastructure/utils/makeActionCreatorFactory'
import { Block } from 'app/infrastructure/models/Block'
import { ProfessionalExperience } from 'app/infrastructure/models/ProfessionalExperience'
import { StaticPage } from 'app/infrastructure/models/StaticPage'

const makeActionCreator = makeActionCreatorFactory('home')

const requestData = makeActionCreator<void>('REQUEST_DATA')

type SetDataPayload = {
  homeStaticPage: StaticPage;
  aboutBlock: Block;
  expertiseBlock: Block;
  generalInformationBlock: Block;
  professionalExperiences: ProfessionalExperience[];
}
const setData = makeActionCreator<SetDataPayload>('SET_DATA')

export default {
  requestData,
  setData,
}

