FROM node:16.3.0-buster
USER node
COPY --chown=node . /home/node/app

WORKDIR /home/node/app

RUN npm install
