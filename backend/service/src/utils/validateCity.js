function validateCity(city) {
    const regex = /^[A-Za-zA-Ö0-ö0-ÿ\s]+$/;
    return typeof city === "string" &&
           city.trim().length > 1 &&
           regex.test(city.trim());
}

module.exports = { validateCity };