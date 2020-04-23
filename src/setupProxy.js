/**
 * proxy代理
 */
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("", {
      target: "http://localhost:8001",
      changeOrigin: true
    })
  );
};
