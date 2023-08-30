FROM node:18-alpine
WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install

EXPOSE 80

CMD ["npm", "start"]
