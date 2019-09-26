import path from 'path'
import { Handler } from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { matchPath } from 'react-router-dom'
import { ChunkExtractor } from '@loadable/server'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import { END } from 'redux-saga'

import createStoreAndSaga from 'app/infrastructure/store'
import App from 'app/ui/App'
import routes from 'app/ui/routes'

// TODO: Clean this up
const renderApp: Handler = (req, res) => {
  const { store, sagaTask } = createStoreAndSaga()

  // Mutable context
  const context: StaticRouterContext = {}

  const webStatsFile = path.resolve('./public/loadable-stats.json')
  const webExtractor = new ChunkExtractor({ statsFile: webStatsFile })
  const jsx = webExtractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  if (context.url) {
    res.writeHead(302, {
      Location: context.url,
    })
    res.send()
    return
  }

  const activeRoute = routes.find(route => matchPath(req.url, route))

  if (App.serverActions) {
    App.serverActions.forEach((serverAction) => {
      store.dispatch(serverAction)
    })
  }

  // Active page's serverActions
  if (activeRoute && activeRoute.serverActions) {
    activeRoute.serverActions.forEach((serverAction) => {
      store.dispatch(serverAction)
    })
  }

  store.dispatch(END)

  sagaTask.toPromise()
    .then(() => {
      const rootAppMarkup = renderToString(jsx)
      const helmet = Helmet.renderStatic()

      if (process.env.NODE_ENV === 'development') {
        console.log('Writing HTML response')
      }

      res.write(`
      <!DOCTYPE html>
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()} 
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
    
        <body ${helmet.bodyAttributes.toString()}>
          <div id="app">${rootAppMarkup}</div>
          <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
          </script>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
    `)
      res.end()
    })
    .catch((err) => {
      console.error(err.message)
    })
}

export default {
  renderApp,
}
