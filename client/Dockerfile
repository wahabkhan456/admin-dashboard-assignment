FROM node:15.8.0

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]