FROM node:8-slim

RUN npm i easy-node-proxy -g

WORKDIR app

# CMD ["easy-node-proxy", "start","-c"]