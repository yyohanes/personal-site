import express, { Router } from 'express'

import ContentfulController from './Controllers/ContentfulController'
import AppController from './Controllers/AppController'

const rootRouter = Router()

// Public
rootRouter.use('/public', express.static('public'))

// Contentful Data Proxy
rootRouter.get('/contentful/:contentModel', ContentfulController.fetchContent)
rootRouter.get('/contentful/:contentModel/:id', ContentfulController.fetchSingleContent)
rootRouter.get('/contentful/:contentModel/:field/:id', ContentfulController.fetchSingleContentByField)

// App
rootRouter.route('/').get(AppController.renderApp)

export default rootRouter
