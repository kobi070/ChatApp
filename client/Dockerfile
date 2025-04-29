# Dockerfile for the Node.js server
# Use the official Node.js image as a base

# Use a lightweight version of Node.js - LTS slim version
FROM node:slim

# Create the app directory
WORKDIR /client

# Copy package.json and package-lock.json
COPY package*.json .

# Install app dependencies
RUN npm install

# Copy index.js
COPY /src /client/src
COPY /public /client/public

# For test usage we will npm install dependencies
CMD [ "npm", "start" ]