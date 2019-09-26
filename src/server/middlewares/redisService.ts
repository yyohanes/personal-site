import express from 'express'
import redis, { RedisClient } from 'redis'

import { redisConfig } from 'app/config/redis'

declare module 'express-serve-static-core' {
  interface Request {
    redis: RedisClient;
  }
}

const buildAndInjectRedisClient = (): express.Handler => {
  const config = {
    password: redisConfig.password || undefined,
    port: (redisConfig.port || 6379) as number,
    prefix: redisConfig.prefix || undefined,
  }
  const client = redis.createClient(config)

  const closeClient = () => {
    try {
      client.quit()
      console.log('Redis client quit')
    } catch (e) {
      console.log('Redis client quit failed')
      console.log(e)
    }
  }

  // process.on('SIGINT', closeClient)
  // process.on('SIGTERM', closeClient)

  return (req, res, next) => {
    req.redis = client
    next()
  }
}

export default buildAndInjectRedisClient
