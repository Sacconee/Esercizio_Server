const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    AUTHSERVER_PORT: parseInt(process.env.AUTHSERVER_PORT) || 3500,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4000/api/v1',
    AUTH_BASE_URL: process.env.AUTH_BASE_URL || 'http://localhost:3500',
    SESSION_SECRET: process.env.SESSION_SECRET,
};