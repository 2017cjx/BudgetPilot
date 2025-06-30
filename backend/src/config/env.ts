import dotenv from 'dotenv';
dotenv.config()

const env = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h',
}

export default env;