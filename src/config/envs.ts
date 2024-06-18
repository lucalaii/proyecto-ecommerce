import { config } from 'dotenv';
config({ path: './src/config/.env' });

export const {
  DB_TYPE,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  JWT_SECRET,
  LISTEN_PORT,
} = process.env;
