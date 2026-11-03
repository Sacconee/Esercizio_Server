const fetch = require("node-fetch");
const paths = require('../../config/paths');
const { getWeather } = require(paths.APICLIENT_UTILS);
const { normalizeWeather } = require(paths.NORMALIZE_WEATHER_UTILS);
const { validateCity } = require(paths.VALIDATE_CITY_UTILS);
const { WEATHER_API_KEY } = require(paths.CONSTANTS_UTILS);
const { logError } = require(paths.LOGGER_UTILS);

exports.weatherController = async (req, res) => {
    const city = req.body.city;

    if (!validateCity(city)) {
        return res.json({ error: true, message: "Città non valida" });
    }

    try {
        const data = await getWeather(city, WEATHER_API_KEY);

        if (data.cod !== 200) {
            return res.json({ error: true, message: "Città non trovata" });
        }

        res.json(normalizeWeather(data));
    } catch (err) {
        logError(err);
        res.json({ error: true, message: "Errore nel server" });
    }
};