FROM node:latest

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY -chown=node:node package*.json ./

RUN npm install

COPY -chown=node:node . .

USER node

EXPOSE 3000

ENTRYPOINT [ "node", "app,js" ]

