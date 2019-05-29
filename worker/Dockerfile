# FROM node:alpine
# WORKDIR "/app"
# COPY ./package.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "run", "start"]
FROM node:5.11.0-slim

WORKDIR /app

RUN npm install -g nodemon
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls
RUN mv /app/node_modules /node_modules
COPY . .
CMD ["npm", "run", "start"]
