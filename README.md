# Easy Node Proxy

An easy and simple web proxy server based on nodejs,pm2.

[![Version npm](https://img.shields.io/npm/v/easy-node-proxy.svg?style=flat-square)](https://www.npmjs.com/package/easy-node-proxy)[![npm Downloads](https://img.shields.io/npm/dm/easy-node-proxy.svg?style=flat-square)](https://npmcharts.com/compare/easy-node-proxy?minimal=true)

## Installation

```
npm install easy-node-proxy -g
```

## Usage

1.start by command line

```javscript
// start server
easy-node-proxy start -t your-proxy-server
// stop server
easy-node-proxy stop
// check other information
easy-node-proxy --help
Usage: easy-node-proxy [options] [command]
```

2.start by proxy.json

```
`npm run generate:config`
edit the proxy.json
`easy-node-proxy start -c`
Options:

-t, --target specify the target proxy server [http://www.exmaple.com]
-h,--host setup your proxy host to use [localhost]
-r,--rewrite rewrite your proxy to use [^/ /]
-p,--port setup your proxy port to use [8000]
-h, --help output usage information

Commands:

start start your proxy server
stop stop your proxy server

```

3.start with docker

```
./scripts/docker.sh
```

## Setup your environment for develop

```

1.npm install
2.config your proxy target and server info
3.npm run prod

```

If you have any questions, pls open git issue to me.

```

```
