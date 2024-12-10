import dotenv from 'dotenv';
dotenv.config();
const config = {
    port: process.env.PORT,
    DB_URI: process.env.MONGO_DB_URI || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    cors: process.env.CORS
};
export default config;
