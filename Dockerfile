############################################################
# Dockerfile to run nodejs server
# Based on baseos
############################################################

FROM node:4.2.1

# File Author / Maintainer
MAINTAINER Siyuan Gao <siyuangao@gmail.com>

# Bundle app source
COPY . /src

# Environment variables
ENV PORT 3939

# Expose program port
EXPOSE 3939

# Installing global package
RUN npm install -g gulp pm2 mocha

# Install app dependencies
RUN cd /src; npm install

ENV NODE_ENV production
ENV NODE_PLATFORM docker

WORKDIR /src

CMD gulp && pm2 start lib/index.js --no-daemon
