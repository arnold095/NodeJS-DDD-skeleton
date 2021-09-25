FROM node:16.9-buster
USER node
COPY --chown=node . /home/node/app

WORKDIR /home/node/app

RUN npm install
