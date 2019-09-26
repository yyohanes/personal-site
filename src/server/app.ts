import express from 'express'
import cors from 'cors'

import routes from './routes'
import redisServiceMiddleware from './middlewares/redisService'

const app = express()

// Middlewares
app.use(cors())
app.use(redisServiceMiddleware())

// Routing
app.use('/', routes)

export default app
