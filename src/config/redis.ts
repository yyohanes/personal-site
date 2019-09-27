export const redisConfig = {
  host: process.env.SERVER_REDIS_HOST,
  port: process.env.SERVER_REDIS_PORT,
  password: process.env.SERVER_REDIS_PASSWORD,
  prefix: `yyohanes_${process.env.NODE_ENV}_`,
}
