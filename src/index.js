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
  "/api",
  proxy({
    target: "http://scm-sh-auto-02.coupang.net:10001",
    changeOrigin: true,
    // pathRewrite: {
    //   '^/api': rewritePath
    // },
    logLevel: "debug"
  })
);

app.use(
  "/sop",
  proxy({
    target: "http://10.211.162.36:8080",
    changeOrigin: true,
    // pathRewrite: {
    //   ['^' + oldPath]: rewritePath
    // },
    logLevel: "debug"
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
        port +
        "/" +
        oldPath}/* --> ${targetProxy + "/" + rewritePath}/*`
    )
  );
});
