FROM node:18-alpine as base

WORKDIR /social_media_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm" , "run" ,"dev"]

