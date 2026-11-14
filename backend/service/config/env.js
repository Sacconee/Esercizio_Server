const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT = parseInt(process.env.PORT, 10) || 3001;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "demo-weather-api-key";

if (!process.env.WEATHER_API_KEY) {
  console.warn("La variabile WEATHER_API_KEY non è definita nel file .env: uso un valore demo per lo sviluppo.");
}

module.exports = {
  WEATHER_API_KEY,
  PORT,
};