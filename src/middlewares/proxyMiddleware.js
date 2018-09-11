const proxy = require("http-proxy-middleware");

module.exports = (req, res, next) => {
  //   console.log(req.headers);
  next();
};
