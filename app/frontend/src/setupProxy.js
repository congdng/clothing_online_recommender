const { createProxyMiddleware } = require('http-proxy-middleware');

//  "proxy": "http://localhost:4000/clothing-online-recommender-backend",

module.exports = function(app) {
  app.use(
    '/clothing-online-recommender-backend/',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};