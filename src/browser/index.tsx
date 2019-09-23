import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadableReady } from '@loadable/component'

import createStoreAndSaga from 'app/infrastructure/store'
import App from 'app/ui/App'

loadableReady(() => {
  const { store } = createStoreAndSaga(window.__PRELOADED_STATE__)

  ReactDOM.hydrate(
    (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    ),
    document.getElementById('app')
  )
})
