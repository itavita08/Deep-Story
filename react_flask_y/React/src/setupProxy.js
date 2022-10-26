/* eslint-disable no-unused-expressions */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		"/api/v1",
		createProxyMiddleware({
			target: "http://localhost:5000",
			changeOrigin: true,
			pathRewrite: {
				'^/api/v1':''
			}
		})
	)
	app.use(
		"/api/v2",
		createProxyMiddleware({
			target: "http://localhost:80",
			changeOrigin: true,
			pathRewrite: {
				'^/api/v2':''
			}
		})	
	)
		
}	