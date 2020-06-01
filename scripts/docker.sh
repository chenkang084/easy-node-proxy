#!/bin/bash

docker run node:12-slim

docker run --name easy-node-proxy -d -t -p 8000:8000 node:12-slim

docker exec -t easy-node-proxy bash -c "npm i easy-node-proxy -g"

