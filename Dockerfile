FROM node:12-slim

# RUN apt-get update && apt-get -yq upgrade && apt-get install  && apt-get install -y git \
#     && apt-get autoremove && apt-get autoclean

# RUN npm i github:chenkang084/easy-node-proxy#master -g

RUN npm i easy-node-proxy http-server -g
# RUN npm i pm2 -g

WORKDIR app

CMD ["sh","-c","easy-node-proxy start -c && npx pm2 logs"]