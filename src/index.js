const http = require("http");
const cors = require("cors");
const express = require("express");
const proxy = require("http-proxy-middleware");
const compression = require("compression");
const config = require("./config");
const chalk = require("chalk");

const app = express();
const middlewares = require("./middlewares");

const targetProxy = process.env.targetProxy;
const port = process.env.port;
const host = process.env.host;

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
    target: targetProxy,
    changeOrigin: true
  })
);

middlewares(app);
const server = http.createServer(app);

// Start your app.
server.listen(port, host, err => {
  if (err) {
    console.log(err);
  }

  console.log(chalk.green("node proxy start successfully!"));
  console.log(
    chalk.green(
      `The node server can proxy http://${host +
        ":" +
        port}/api/* --> ${targetProxy}api/*`
    )
  );
});
