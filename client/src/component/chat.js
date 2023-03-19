import React, { useEffect, useState } from "react";
import "../component/chat.css";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      // console.log(`${currentMessage} is not empty !`);
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      // console.log(JSON.stringify(messageData));
      await socket.emit("send_message", messageData);
      setCurrentMessage((list) => [list, ...messageData]);
      setCurrentMessage("");
    }
  };

  // We use useEffect as a listener for the chat
  // whenever ther is any changes to our socket
  // we call this func
  useEffect(() => {
    socket.on("recive_message", (data) => {
      console.log(data);
      setMessageList((list) => [list, ...data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="chat-container"
        >
          {messageList.map((messageContent) => {
            console.log(messageContent.map())
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          className="chat-btn"
          type="text"
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
        ></input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
