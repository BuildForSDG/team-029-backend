const development = {
  ENVIRONMENT: 'development',
  ROADRY_DATABASE_URL: process.env.ROADRY_DEV_DATABASE_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY
};

export default development;
