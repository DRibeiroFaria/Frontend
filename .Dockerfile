FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm i
RUN npm run-script build

EXPOSE 4200

CMD ["npm", "start"]