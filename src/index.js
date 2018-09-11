const http = require("http");
const cors = require("cors");
const express = require("express");
const proxy = require("http-proxy-middleware");
const compression = require("compression");
const config = require("./config");
const chalk = require("chalk");

const app = express();
const middlewares = require("./middlewares");

// enable cors request
app.use(
  cors({
    credentials: true
  })
);

app.use(compression());

app.use(
  "/api",
  proxy({
    target: config.target,
    changeOrigin: true
  })
);

middlewares(app);
const server = http.createServer(app);

// Start your app.
server.listen(config.server.port, config.server.host, err => {
  if (err) {
    console.log(err);
  }

  console.log(chalk.green("node proxy start successfully!"));
});
