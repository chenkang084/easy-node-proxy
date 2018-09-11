const proxyMiddleware = require("./proxyMiddleware");

module.exports = app => {
  app.use(proxyMiddleware);
};
