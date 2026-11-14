const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env.js");

const app = express();
const frontendPublic = path.join(__dirname, "..", "..", "..", "frontend", "public");

app.use(express.static(frontendPublic));
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPublic, "index.html"));
});

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
    pathRewrite: (pathStr) => {
        const rewritten = pathStr.replace(/^\/api\/v1/, "");
        return rewritten === "" ? "/" : rewritten;
    }
}));

app.listen(config.GATEWAY_PORT, () => {
    console.log(`Gateway server is running on http://localhost:${config.GATEWAY_PORT}/api/v1/`);
});
