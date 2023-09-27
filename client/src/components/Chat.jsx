import React, { useEffect, useState } from "react";
import ChatBallon from "./ChatBallon";

function Chat({ socket, username, room }) {
  const [text, setText] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => setMessageHistory((prev) => [...prev, data]));
  }, [socket]);

  const getTime = () => new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();

  const sendMessage = async () => {
    if (text === "") return;
    const messageData = { id: new Date().getTime(), room, author: username, message: text, time: getTime() };
    await socket.emit("send_message", messageData);
    setMessageHistory((prev) => [...prev, messageData]);
    setText("");
  };

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageHistory.map((msg) => (
          <ChatBallon key={msg.id} msg={msg} />
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Enter</button>
      </div>
    </div>
  );
}

export default Chat;
