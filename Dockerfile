FROM node:10

# Create app directory
WORKDIR /usr/src/pheromones

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Web server for the REST API
EXPOSE 40502
# Sockets server
EXPOSE 40502

CMD [ "node", "index.js" ]