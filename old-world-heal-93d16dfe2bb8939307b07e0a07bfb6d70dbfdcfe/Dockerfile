FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm ci

EXPOSE 5173

CMD ["npm","run","preview"]