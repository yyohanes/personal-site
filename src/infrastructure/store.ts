import { createStore as createReduxStore, applyMiddleware, Middleware, compose, Store } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { Task } from 'redux-saga'

import reducers, { State } from './reducers'
import sagas from './sagas'

interface StoreWithSaga {
  store: Store;
  sagaTask: Task;
}
export default function createStoreAndSaga (preloadedState?: State): StoreWithSaga {
  let middlewares: Middleware[] = []

  if (process.env.NODE_ENV === 'development' && __IS_BROWSER__) {
    const loggerMiddleware = createLogger({
      level: 'info',
    })

    middlewares = [...middlewares, loggerMiddleware]
  }

  const sagaMiddleware = createSagaMiddleware()
  middlewares = [...middlewares, sagaMiddleware]

  return {
    store: preloadedState
      ? createReduxStore(reducers, preloadedState, compose(applyMiddleware(...middlewares)))
      : createReduxStore(reducers, compose(applyMiddleware(...middlewares))),
    sagaTask: sagaMiddleware.run(sagas),
  }
}
