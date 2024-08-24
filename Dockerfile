FROM node:16-alpine

ENV DB_PASSWORD=root

WORKDIR /app/recipesMix

RUN apk update && apk add git

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","run","dev"]