// Require the express module and create an instance of the app
const express = require("express");
const app = express();

// Require the http module and create a server instance using the app
const http = require("http");
const server = http.createServer(app);

// Require the cors module and use it to enable cross-origin requests
const cors = require("cors");
app.use(cors());

// Require the socket.io module and create a new instance of the Server class
const { Server } = require("socket.io");
const io = new Server(server, {
    // Set up CORS options to allow connections from the specified origin and methods
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Set up socket.io event listeners for when a client connects or disconnects
io.on('connection', (socket) =>{
    console.log(`socket.id = ${socket.id}`)

    // Listen for the 'join_room' event and join the specified room
    socket.on("join_room", (data) => {
        console.log(`User ${socket.id} joined room: ${data}`);
        socket.join(data);
    });

    // Listen for the 'send_message' event and broadcast the message to everyone in the room
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recive_message", data);
        console.log(`${JSON.stringify(data)}`);
    });

    // Listen for the 'disconnect' event and log the socket ID
    socket.on("disconect", () => console.log(`${socket.id} disconnected`));
});

// Start the server listening on port 3001 and log a message to the console
server.listen(3001, () =>{
    console.log(`Listening on port 3001`);
    console.log(`Connected to server !`)
});
