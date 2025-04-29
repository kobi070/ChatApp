# ChatApp using React, Express, and Socket.IO

This is a simple chat application built using React, Express, and Socket.IO. The application allows users to join a chat room and send messages in real-time. The messages are displayed in the chat window and are always scrolled to the bottom.
### Watch Demo - https://kobi070.github.io/ChatApp

### Features

- Join a chat room using a unique username
- Send and receive messages in real-time
- Messages are displayed in a scrollable chat window
- Messages are timestamped with the current time

## Getting Started

1. Clone this repository to your local machine
2. Install dependencies by running `npm install` in both the root directory and the `client` directory
3. Start the server by running `npm start` in the server directory
4. Start the client by running `npm start` in the `client` directory
5. Open `http://localhost:3000` in your browser to access the chat application

or
if you have docker && docker compose installed you can run this
```bash
  docker compose -f docker-compose.yaml up -d
```

## How it Works

The application consists of two main parts: the server-side and the client-side. 

The server-side is built using Express and Socket.IO. It creates a Socket.IO server that listens for incoming connections and handles the chat events. 

The client-side is built using React and connects to the server using Socket.IO. It allows users to enter a username and join a chat room. Once a user is connected to the chat room, they can send and receive messages in real-time.

## Technologies Used

- React
- Express
- Socket.IO

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
