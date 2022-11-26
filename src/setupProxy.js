const {createProxyMiddleware} = require("http-proxy-middleware")
module.exports = function (app) {
    app.use("api", createProxyMiddleware({
        target: "http://82.157.154.180:8082",
        changeOrigin: true,
        // pathRewrite: {
        //     "/api": ""
        // }
    }))
}
