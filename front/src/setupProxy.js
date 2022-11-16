const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api/flask",
    createProxyMiddleware({
      target: "http://43.201.124.37:5000",
      changeOrigin: true,
      pathRewrite: {
        "^/api/flask": "",
      },
    })
  );

  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "http://52.78.47.188:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/api/v1": "",
      },
    })
  );
};
