import React, { useEffect, useState } from "react";
import "../component/chat.css";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      console.log(`${currentMessage} is not empty !`);
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };

  // We use useEffect as a listener for the chat
  // whenever ther is any changes to our socket
  // we call this func
  useEffect(() => {
    socket.on("recive_message", (data) => {});
  }, [socket]);

  return (
    <div className="chat">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="chat main">
        </div>
      </div>
      <div className="chat-footer">
        <input
          className="chat-btn"
          type="text"
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
        ></input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
