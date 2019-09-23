import { AnyAction } from 'app/infrastructure/utils/makeActionCreatorFactory'
import { Block } from 'app/infrastructure/models/Block'
import HomeActions from 'app/infrastructure/Home/actions'
import { ProfessionalExperience } from 'app/infrastructure/models/ProfessionalExperience'

export type HomeState = {
  aboutBlock: Block | null;
  generalInformationBlock: Block | null;
  professionalExperiences: ProfessionalExperience[];
}

const defaultState: HomeState = {
  aboutBlock: null,
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
        aboutBlock: action.payload.aboutBlock,
        generalInformationBlock: action.payload.generalInformationBlock,
        professionalExperiences: action.payload.professionalExperiences,
      }
  }

  return {
    ...state,
  }
}
