import React, { useEffect, useState } from "react"; // import React and the necessary hooks
import "../component/chat.css"; // import the styles for the component
import ScrollToBottom from "react-scroll-to-bottom"; // import the third-party library

function Chat({ socket, username, room }) {
  // define the Chat component that accepts socket, username and room as props
  const [currentMessage, setCurrentMessage] = useState(""); // define a state for the current message
  const [messageList, setMessageList] = useState([]); // define a state for the list of messages

  const sendMessage = async () => {
    // define the function to send a message
    if (currentMessage !== "") {
      // check if the message is not empty
      const messageData = {
        // create a new message object with room, author, message and time
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData); // emit the message to the server
      setMessageList((list) => [...list, messageData]); // update the message list with the new message
      setCurrentMessage(''); // clear the current message
    }
  };

  useEffect(() => {
    // use useEffect to listen for incoming messages
    socket.on("recive_message", (data) => {
      // listen for incoming messages with the "receive_message" event
      console.log(data); // log the incoming message data to the console
      setMessageList((list) => [...list, data]); // update the message list with the new message data
    });
  }, [socket]); // specify the socket as a dependency so the effect only runs when the socket changes

  return (
    // return the chat component
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat - Room {room}</p>
      </div>
      <div className="chat-body">
        {/* use the ScrollToBottom component to automatically scroll to the bottom of the chat */}
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
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
          onChange={(event) => setCurrentMessage(event.target.value)} // update the current message as the user types
          onKeyDown={(event) => event.key === "Enter" && sendMessage()} // send the message when the user presses Enter
        ></input>
        {/*  use a button to send the message */}
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat; // export the Chat component for use in other parts of the app
