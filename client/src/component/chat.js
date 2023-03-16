import React, { useState } from "react";
import "../component/chat.css";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = () => {
    if (currentMessage !== "") {
        console.log(`${currentMessage} is not empty !`)
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()),
      };
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="chat main">
            <p>
              Your messages...
            </p>
        </div>
      </div>
      <div className="chat-footer">
        <input
          className="chat-btn"
          type="text"
          placeholder="Hey..."
          onClick={sendMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
        ></input>
        <button>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
