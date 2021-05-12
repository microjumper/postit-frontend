FROM node:alpine as node
WORKDIR /app
COPY package.json /app
RUN npm install && npm cache clean
COPY . /app
RUN npm run build --prod