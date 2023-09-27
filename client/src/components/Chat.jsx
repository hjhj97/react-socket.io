import React, { useEffect, useState } from "react";
import ChatBalloon from "./ChatBalloon";

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
    <div
      style={{
        border: "1px solid black",
        width: "300px",
        margin: "100px  auto",
        height: "400px",
        position: "relative",
      }}
    >
      <div className="chat-header">
        <h3 style={{ textAlign: "center" }}>Live Chat</h3>
      </div>
      <div className="chat-body" style={{ height: "80%", overflowY: "scroll" }}>
        {messageHistory.map((msg) => (
          <ChatBalloon key={msg.id} msg={msg} />
        ))}
      </div>
      <div className="chat-footer" style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <input
          style={{ width: "80%" }}
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
