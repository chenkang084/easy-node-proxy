# Easy Node Proxy

An easy and simple web proxy server based on nodejs,pm2.

## Installation

```
npm install easy-node-proxy -g
```

## Usage

```javscript
// start server
easy-node-proxy start -t your-proxy-server
// stop server
easy-node-proxy stop
// check other information
easy-node-proxy --help
Usage: easy-node-proxy [options] [command]

Options:

  -t, --target  specify the target proxy server [http://www.exmaple.com]
  -h,--host     setup your proxy host to use [localhost]
  -r,--rewrite  rewrite your proxy to use [^/ /]
  -p,--port     setup your proxy port to use [8000]
  -h, --help    output usage information

Commands:

  start         start your proxy server
  stop          stop your proxy server
```

## Setup your environment for develop

```
1.npm install
2.config your proxy target and server info
3.npm run prod
```

If you have any questions, pls open git issue to me.
