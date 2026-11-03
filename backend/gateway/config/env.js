require("dotenv").config();

module.exports = {
    SERVER_URL: process.env.SERVER_URL || "http://localhost:3000",
    GATEWAY_PORT: parseInt(process.env.GATEWAY_PORT || "4000", 10),
    AUTH_SERVER_URL: process.env.AUTH_SERVER_URL || "http://localhost:3500",
    FBI_SERVER_URL: process.env.FBI_SERVER_URL || "http://localhost:3002"
};