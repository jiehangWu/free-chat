FROM node:current-slim

WORKDIR /free-chat

COPY package.json .

RUN npm install

EXPOSE 8080

CMD ["npm", "start", "run"]

COPY . .

