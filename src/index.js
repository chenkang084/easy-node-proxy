const http = require("http");
const cors = require("cors");
const express = require("express");
const proxy = require("http-proxy-middleware");
const compression = require("compression");
const chalk = require("chalk");

const app = express();
const middlewares = require("./middlewares");

const targetProxy = process.env.targetProxy;
const port = process.env.port;
const host = process.env.host;
const rewritePath = process.env.rewritePath;
const oldPath = process.env.oldPath;

// enable cors request
app.use(
  cors({
    credentials: true
  })
);

app.use(compression());

middlewares(app);

app.use(
  "/*",
  proxy({
    target: targetProxy,
    changeOrigin: true,
    pathRewrite: {
      ["^" + oldPath]: rewritePath
    }
  })
);

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
        port}/api/* --> ${targetProxy}/api/*`
    )
  );
});
