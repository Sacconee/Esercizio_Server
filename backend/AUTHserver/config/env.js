const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const cleanVal = (val) => {
    if (typeof val !== 'string') return '';
    return val.trim().replace(/^["']|["']$/g, '').trim();
};

module.exports = {
    NODE_ENV: cleanVal(process.env.NODE_ENV) || 'development',
    AUTHSERVER_PORT: parseInt(process.env.AUTHSERVER_PORT, 10) || 3500,
    GOOGLE_CLIENT_ID: cleanVal(process.env.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_SECRET: cleanVal(process.env.GOOGLE_CLIENT_SECRET),
    FRONTEND_URL: cleanVal(process.env.FRONTEND_URL) || 'http://localhost:4000/api/v1',
    AUTH_BASE_URL: cleanVal(process.env.AUTH_BASE_URL) || 'http://localhost:3500',
    SESSION_SECRET: cleanVal(process.env.SESSION_SECRET) || 'secret-key',
};