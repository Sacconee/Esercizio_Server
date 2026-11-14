const fetchFn = typeof fetch === "function" ? fetch : require("node-fetch");

async function getWeather(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=it`;
    const response = await fetchFn(url);
    return await response.json();
}

module.exports = { getWeather };