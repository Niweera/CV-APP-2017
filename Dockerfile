FROM node:latest

WORKDIR /home/app

COPY . .

#this installs node v8.16.1
RUN bash ./install.sh

RUN cd ./server && npm install
RUN cd ./client && npm install

EXPOSE 8080
CMD [ "node", "./server/server.js" ]