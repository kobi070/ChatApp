import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./component/chat";

// Connect the backend to the frontend trough socket.io
const socket = io.connect("http://localhost:3001");
socket.on("connection", () => {
  console.log("Connected succesfuly");
});

function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div className="App">
      <h3 className="join">Join a Chat</h3>
      <input
        className="username"
        placeholder="John..."
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      ></input>
      <input
        className="room id"
        placeholder="Room ID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      ></input>
      <br></br>
      <button className="join-btn" onClick={joinRoom}>
        Join a Room !
      </button>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
