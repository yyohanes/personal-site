export const redisConfig = {
  port: process.env.SERVER_REDIS_PORT,
  password: process.env.SERVER_REDIS_PASSWORD,
  prefix: `yyohanes_${process.env.NODE_ENV}_`,
}
