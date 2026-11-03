const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env.js");

const app = express();

app.use("/api/v1/wanted", createProxyMiddleware({
    target: config.FBI_SERVER_URL,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1/wanted": ""
    }
}));


app.use("/api/v1/auth", createProxyMiddleware({
    target: config.AUTH_SERVER_URL,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1/auth": ""
    }
}));



app.use("/api/v1", createProxyMiddleware({
    target: config.SERVER_URL,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1": ""
    }
}));

app.listen(config.GATEWAY_PORT, () => {
    console.log(`Gateway server is running on http://localhost:${config.GATEWAY_PORT}/api/v1/`);
});
