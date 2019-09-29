import { AnyAction } from 'app/infrastructure/utils/makeActionCreatorFactory'
import { Block } from 'app/infrastructure/models/Block'
import { StaticPage } from 'app/infrastructure/models/StaticPage'
import HomeActions from 'app/infrastructure/Home/actions'
import { ProfessionalExperience } from 'app/infrastructure/models/ProfessionalExperience'

export type HomeState = {
  homeStaticPage: StaticPage | null;
  aboutBlock: Block | null;
  expertiseBlock: Block | null;
  generalInformationBlock: Block | null;
  professionalExperiences: ProfessionalExperience[];
}

const defaultState: HomeState = {
  homeStaticPage: null,
  aboutBlock: null,
  expertiseBlock: null,
  generalInformationBlock: null,
  professionalExperiences: [],
}

export default function appReducer (
  state: HomeState = defaultState,
  action: AnyAction
): HomeState {
  switch (action.type) {
    case HomeActions.setData.TYPE:
      return {
        ...state,
        homeStaticPage: action.payload.homeStaticPage,
        aboutBlock: action.payload.aboutBlock,
        expertiseBlock: action.payload.expertiseBlock,
        generalInformationBlock: action.payload.generalInformationBlock,
        professionalExperiences: action.payload.professionalExperiences,
      }
  }

  return {
    ...state,
  }
}
