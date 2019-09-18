FROM node:10-slim

RUN apt-get update && apt-get -yq upgrade && apt-get install  && apt-get install -y git \
    && apt-get autoremove && apt-get autoclean

RUN npm i github:chenkang084/easy-node-proxy#master -g

RUN npm i http-server -g

WORKDIR app

# CMD ["easy-node-proxy", "start","-c"]