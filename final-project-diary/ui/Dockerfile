FROM node:alpine

# Installs pm2 for linux
RUN npm install -g pm2

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY ./package.json ./
RUN npm install

# Bundle app source [MAKE SURE TO DELETE node_modules]
COPY ./ ./
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "docker-start" ]