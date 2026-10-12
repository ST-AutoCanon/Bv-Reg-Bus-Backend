FROM node:18.9.0
WORKDIR /app
COPY package.json .
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
ARG NODE_ENV
RUN npm install
COPY . ./
EXPOSE 3001
CMD [ "npm", "run", "start" ]