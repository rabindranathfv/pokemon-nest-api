import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  // JWT_SECRET: Joi.string().required(),
  // JWT_EXPIRES_IN: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.string(),
  DB_NAME: Joi.string(),
  MONGO_URL: Joi.string().required(),
  // TTL_CACHE: Joi.string().required(),
  // MAX_CACHE_STORAGE: Joi.string().required(),
  // REDIS_HOST: Joi.string().required(),
  // REDIS_PORT: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().default(10),
});
