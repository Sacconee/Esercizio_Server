const path = require("path");

// Directory ROOT del servizio
const ROOT = path.join(__dirname, "..");
const FRONTEND_PUBLIC = path.join(ROOT, "..", "..", "frontend", "public");
// Percorsi principali
module.exports = {
  ROOT,
  SRC: path.join(ROOT, "src"),
  //PUBLIC: path.join(ROOT, "public"),
  PUBLIC: FRONTEND_PUBLIC,
  ROUTES: path.join(ROOT, "src", "routes"),
  // Controllers
  CONTROLLERS: path.join(ROOT, "src", "controllers"),
  WEATHER_CONTROLLER: path.join(ROOT, "src","controllers", "weatherController.js"),
  //UTILS
  APICLIENT_UTILS: path.join(ROOT, "src", "utils", "apiClient.js"),
  LOGGER_UTILS: path.join(ROOT, "src", "utils", "logger.js"),
  NORMALIZE_WEATHER_UTILS: path.join(ROOT, "src", "utils", "normalizeWeather.js"),
  VALIDATE_CITY_UTILS: path.join(ROOT, "src", "utils", "validateCity.js"),
  CONSTANTS_UTILS: path.join(ROOT, "src", "utils", "constants.js"),
  UTILS: path.join(ROOT, "src", "utils")
};