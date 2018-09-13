const chalk = require("chalk");

const targetProxy = process.env.targetProxy;
const port = process.env.port;
const host = process.env.host;

module.exports = (req, res, next) => {
  // var url = req.url;
  // console.log(
  //   chalk.green(
  //     `proxy http://${host + ":" + port + url} --> ${targetProxy + url}`
  //   )
  // );
  next();
};
