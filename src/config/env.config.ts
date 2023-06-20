export const loadConfig = () => ({
  NODE_ENV: process.env.NODE_ENV || 'Development',
  MONGO_URL: process.env.MONGO_URL
    ? process.env.MONGO_URL
    : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  PORT: +process.env.PORT || 3000,
  DEFAULT_LIMIT: +process.env.DEFAULT_LIMIT || 10,
});
