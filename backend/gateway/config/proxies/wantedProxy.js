const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../env");

module.exports = createProxyMiddleware({
  target: config.FBI_SERVER_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1/wanted": ""
  }
});