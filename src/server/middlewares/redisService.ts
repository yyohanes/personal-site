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
    host: redisConfig.host || undefined,
    password: redisConfig.password || undefined,
    port: (redisConfig.port || 6379) as number,
    prefix: redisConfig.prefix || undefined,
  }
  const client = redis.createClient(config)

  return (req, res, next) => {
    req.redis = client
    next()
  }
}

export default buildAndInjectRedisClient
