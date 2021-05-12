# stage 1
FROM node:alpine as node
WORKDIR /app
COPY package.json /app
RUN npm install --force && npm cache clean --force
COPY . /app
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html