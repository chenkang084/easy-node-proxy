const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const backofficeMiddleware = require('./middlewares/backoffice.middleware');

const app = express();

const { targetProxy, rewritePath, oldPath, config } = process.env;
let { port, host } = process.env;

const regex = /^\/scm\/*/gm;
app.use(compression());

if (config) {
  const proxyPath = `${process.cwd()}/proxy.json`;
  if (!fs.existsSync(proxyPath)) {
    console.log(chalk.red(`proxy.json doesn't exist, pls execuate 'npm run generate:config'`));
    return;
  }

  const { localServer, proxyServer, allowOrigin = [], backoffice = false, env = 'stage' } = JSON.parse(
    fs.readFileSync(proxyPath)
  );

  app.use(
    cors({
      origin: allowOrigin,
      credentials: true
    })
  );

  if (backoffice) {
    app.use(cookieParser());
    app.use(backofficeMiddleware(env));
  }

  if (localServer) {
    localServer.port && (port = localServer.port);
    localServer.host && (host = localServer.host);
  }

  if (proxyServer && proxyServer.length > 0) {
    proxyServer.forEach(({ path, target, changeOrigin = false, ...opts }) => {
      app.use(
        [path],
        proxy({
          target,
          changeOrigin,
          logLevel: 'debug',
          logProvider: (provider) => {
            return {
              ...provider,
              debug: (log) => {
                console.log(moment().format('YYYY-MM-DD HH:mm:ss') + ':' + log);
              },
              info: (log) => {
                console.log(
                  chalk.green(`${moment().format('YYYY-MM-DD HH:mm:ss')} :[HPM] Proxy created:${path}  ->  ${target}`)
                );
              }
            };
          },
          ...opts
        })
      );
    });
  } else {
    chalk.red('proxyServer must be specified!');
    process.exit();
  }
} else {
  app.use(cors());

  app.use(
    '/*',
    proxy({
      target: targetProxy,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        ['^' + oldPath]: rewritePath
      }
    })
  );
}

const server = http.createServer(app);

// Start your app.
server.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(chalk.green('node proxy start successfully!'));
  console.log(chalk.green(`The node server can proxy http://${host + ':' + port}/api/* --> /api/*`));
});
