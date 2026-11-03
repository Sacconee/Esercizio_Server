require('dotenv').config();

module.exports = {
    AUTHSERVER_PORT: parseInt(process.env.AUTHSERVER_PORT) || 3500,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};