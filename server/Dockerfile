# Dockerfile for the Node.js server
# Use the official Node.js image as a base

# Use a lightweight version of Node.js - LTS slim version
FROM node:slim

# Create the app directory
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --silent

# Copy the rest of the app code
COPY index.js ./

EXPOSE 3000