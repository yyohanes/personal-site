import { Action as ActionRedux } from 'redux'

export type Action<P> = ActionRedux & {
  payload: P;
}

export type AnyAction = Action<any>

export type ActionCreator<P> = {
  (payload: P): Action<P>;
  TYPE: string;
}

export default function (domain: string) {
  return function <P> (type: string): ActionCreator<P> {
    const namespacedType = `${domain}/${type}`

    const action = function (payload: P): Action<P> {
      return {
        type: namespacedType,
        payload,
      }
    }

    action.TYPE = namespacedType

    return action
  }
}
