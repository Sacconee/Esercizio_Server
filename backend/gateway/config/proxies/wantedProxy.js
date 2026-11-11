const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env");

module.exports = createProxyMiddleware({
  target: config.WANTED_SERVICE_URL, // o il nome della tua variabile di ambiente
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1/wanted": ""
  }
});