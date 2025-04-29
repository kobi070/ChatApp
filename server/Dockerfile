FROM node:23-alpine

# Create the app directory
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --silent

# Copy the rest of the app code
COPY index.js ./

EXPOSE 3000