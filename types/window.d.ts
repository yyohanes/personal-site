import { State } from 'app/infrastructure/reducers'

declare global {
  interface Window {
    __PRELOADED_STATE__: State;
  }
}
