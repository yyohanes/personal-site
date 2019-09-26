import { createClient } from 'contentful'
import { Handler } from 'express'

import { contentfulConfig } from 'app/config/contentful'

const contentfulClient = createClient({
  space: contentfulConfig.spaceId,
  accessToken: contentfulConfig.deliveryToken,
})

const fetchContent: Handler = (req, res) => {
  try {
    const redisKey = req.url
    req.redis.get(redisKey, async (err, cachedEntries) => {
      let returnedEntries = null

      if (!cachedEntries) {
        const page = req.query.page || 1
        const limit = 100

        const entries = await contentfulClient.getEntries({
          // eslint-disable-next-line @typescript-eslint/camelcase
          content_type: req.params.contentModel,
          include: 1,
          skip: (page - 1) * limit,
          limit,
          order: req.query.order || undefined,
        })

        req.redis.setex(redisKey, 60, JSON.stringify(entries))
        returnedEntries = entries
      } else {
        returnedEntries = JSON.parse(cachedEntries)
      }

      res.json(returnedEntries)
    })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const fetchSingleContent: Handler = (req, res) => {
  try {
    const redisKey = req.url
    req.redis.get(redisKey, async (err, content) => {
      let returnedEntry = null

      if (!content) {
        const entry = await contentfulClient.getEntry(req.params.id, {
          // eslint-disable-next-line @typescript-eslint/camelcase
          content_type: req.params.contentModel,
        })

        if (entry) {
          req.redis.setex(redisKey, 60, JSON.stringify(entry))
          returnedEntry = entry
        }
      } else {
        returnedEntry = JSON.parse(content)
      }

      res.json(returnedEntry)
    })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const fetchSingleContentByField: Handler = (req, res) => {
  try {
    const redisKey = req.url
    req.redis.get(redisKey, async (err, content) => {
      let returnedEntry = null

      if (!content) {
        const entries = await contentfulClient.getEntries({
          // eslint-disable-next-line @typescript-eslint/camelcase
          content_type: req.params.contentModel,
          [`fields.${req.params.field}`]: req.params.id,
        })

        if (entries.total > 0) {
          req.redis.setex(redisKey, 60, JSON.stringify(entries.items[0]))
          returnedEntry = entries.items[0]
        }
      } else {
        returnedEntry = JSON.parse(content)
      }

      if (!returnedEntry) {
        throw new Error('Entry not found')
      }

      res.json(returnedEntry)
    })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

export default {
  fetchContent,
  fetchSingleContent,
  fetchSingleContentByField,
}
