import { AnyAction } from 'app/infrastructure/utils/makeActionCreatorFactory'
import { Block } from 'app/infrastructure/models/Block'
import AppActions from 'app/infrastructure/App/actions'
import { ProfessionalExperience } from 'app/infrastructure/models/ProfessionalExperience'

export type AppState = {
  version: string;
  logoBlock: Block | null;
  footerBlock: Block | null;
}

const defaultState: AppState = {
  version: require('package.json').version,
  logoBlock: null,
  footerBlock: null,
}

export default function appReducer (
  state: AppState = defaultState,
  action: AnyAction
): AppState {
  switch (action.type) {
    case AppActions.setBootData.TYPE:
      return {
        ...state,
        logoBlock: action.payload.logoBlock,
        footerBlock: action.payload.footerBlock,
      }
  }

  return {
    ...state,
  }
}
