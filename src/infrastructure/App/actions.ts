import makeActionCreatorFactory from 'app/infrastructure/utils/makeActionCreatorFactory'
import { Block } from 'app/infrastructure/models/Block'

const makeActionCreator = makeActionCreatorFactory('app')

const appStartup = makeActionCreator<void>('APP_STARTUP')
const requestBootData = makeActionCreator<void>('REQUEST_BOOT_DATA')

type SetBootDataPayload = {
  headerBlock: Block;
  footerBlock: Block;
}
const setBootData = makeActionCreator<SetBootDataPayload>('SET_BOOT_DATA')

export default {
  appStartup,
  requestBootData,
  setBootData,
}
