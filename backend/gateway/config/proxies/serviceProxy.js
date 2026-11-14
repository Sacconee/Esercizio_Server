const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../env");

module.exports = createProxyMiddleware({
  target: config.SERVER_URL,
  changeOrigin: true,
  pathRewrite: (pathStr) => {
    const rewritten = pathStr.replace(/^\/api\/v1/, "");
    return rewritten === "" ? "/" : rewritten;
  }
});