const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports=function(app) {
//     app.use(
//         "/api",
//         createProxyMiddleware({
//             target:"http://localhost:8080",
//             changeOrigin : true,
//         })
//     );

// };


module.exports = (app) => {
    app.use(
        "/api/v1",
        createProxyMiddleware({
            target:"http://localhost:5000",
            changeOrigin : true,
            pathRewrite: {
                '^/api/v2':''
            }
        })
    );

    app.use(
        "/api/v2",
        createProxyMiddleware({
            target:"http://localhost:80",
            changeOrigin : true,
        })
    );

  };