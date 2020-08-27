FROM node:10-alpine

WORKDIR /app

COPY dist/ /app/dist
COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app

RUN ls -l

RUN npm install

EXPOSE 80

CMD [ "node", "dist/index.js" ]