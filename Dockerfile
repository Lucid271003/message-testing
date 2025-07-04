# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env .env
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
